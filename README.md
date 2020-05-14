# Unlock

## ![GA](https://cloud.githubusercontent.com/assets/40461/8183776/469f976e-1432-11e5-8199-6ac91363302b.png)  General Assembly, Software Engineering Immersive

## Overview

Unlock was my last project with General Assembly and the most complex project I developed during the Software Engineering Immersive course. 

For this project I decided to create a platform where people can find support and advice on following their dream career. 
The platform allows members to create a mentor or a mentee profile and share a personal story page. 
A mentor can share external documentation, offer guidance through a chat system via the platform.  

Main functionalities:

- user register/login
- creating a profile as a mentor or mentee (adding a profile picture, motto, personal story)
- mentees can subscribe to one or more mentors
- rating mentors
- searching for mentors
- asking questions (creating a chat thread)
- replying to a chat thread



## Brief
- Build a full-stack application by making your own back end and your own front end
- Use a Python Django API to serve your data from a Postgres database
- Create a front end built with React
- Deploy the app with Heroku


## Technologies Used

- JavaScript
- React.js
- Python
- Django
- PostgreSQL
- HTML
- CSS, SCSS
- Axios
- Webpack
- Git/GitHub
- Moment
- Heroku


## Approach

## Back End

## Models
After configuring Django, I created a PostgreSQL database and the main entities for the model.
Creating the models is the core part of the application, so I allocated time for designing and testing the schema in Django Admin's UI and in Insomnia. 

This step was time consuming but crucial to the development of the app. 
I wanted to get the schema right as this was the backbone of the application. I had to make some more changes as well while building the back end logic, but luckily the changes did not impact the delivery of the project.

## JWT.AUTH
I created a separate Django module for authentication.
The snippet below shows enhancement to the Django User model to have the email as a unique and mandatory field.

```py
from django.contrib.auth.models import User
User._meta.get_field('email')._unique = True
User._meta.get_field('email').blank = False
```

In order to model the User relationship with the other entities and also to create some methods to retrieve related user information (from child tables), I had to extend it by creating a Person class (proxy to the Django User).

I created methods that are used in the Person serializer in order to retrieve related user information (user roles, skills, metees, mentors, votes)

```py
class Person(User):
  class Meta:
    proxy = True
    
  @property
  def roles(self):
    return User_Role.objects.filter(user=self.id).values_list('role__name', flat=True)

  @property
  def skills(self):
    return User_Skill.objects.filter(user=self.id).values_list('skill__name', flat=True)

  @property
  def mentees(self):
    return UserRelationship.objects.filter(mentor=self.id).values_list('mentee', flat=True)

  @property
  def mentors(self):
    return UserRelationship.objects.filter(mentee=self.id).values_list('mentor', flat=True)

  @property
  def votes(self):
    return UserRelationship.objects.filter(mentor=self.id).aggregate(sumVotes=Sum('votes')).get('sumVotes')
    

class Role(models.Model):
  name = models.CharField(max_length=30)
  def __str__(self):
    return self.name


class Skill(models.Model):
  name = models.CharField(max_length=50)
  def __str__(self):
    return self.name
```

User_Role is creating a many-to-many relationship between a Person and a Role, a person can have many roles and a role can belong to many persons:

```py
class User_Role(models.Model):
  user = models.ForeignKey(Person, related_name='user_role_user', on_delete=models.CASCADE)
  role = models.ForeignKey(Role, related_name='user_role_role', on_delete=models.CASCADE)

  class Meta:
    unique_together = (('user', 'role',))
```

User_Skill is  similar to User_Role, creating a many-to-many relationship between a Person and a Skill


```py
class User_Skill(models.Model):
  user = models.ForeignKey(Person, related_name='user_skills_user', on_delete=models.CASCADE)
  skill = models.ForeignKey(Skill, related_name='user_skills_skill', on_delete=models.CASCADE)

  class Meta:
    unique_together = (('user', 'skill',))

```

UserRelationship is creating a many-to-many relation between mentors and mentees (self-referencing since we are using the same entity -- Person). One mentor can have many mentees, one mentee can have many mentors. I created an attribute 'votes', to capture the vote of a mentee for a particular mentor.

```py
class UserRelationship(models.Model):
    mentor = models.ForeignKey(Person, related_name='mentor', on_delete=models.CASCADE)
    mentee = models.ForeignKey(Person, related_name='mentee', on_delete=models.CASCADE)
    votes = models.IntegerField(blank=True, null=True, default=0)
  
    @property
    def votesCount(self):
      return UserRelationship.objects.filter(mentor=self.mentor).aggregate(sumVotes=Sum('votes')).get("sumVotes")   
    class Meta:
      unique_together = (('mentor', 'mentee',))
```

The entity CommentType is used to store the types of comments supported by the platform: public/private.This static table which will only be populated from a fixture file at the project setup:

```py
class CommentType(models.Model):
  comment_type = models.CharField(max_length=30)
  def __str__(self):
    return self.comment_type
```

The CommentThread entity models message threads that can be created on the platform, allowing to specify the thread type ('commentType'),
the first message on the thread ('initialComment'), the user the created the thread ('fromUser'), thread date ('startDate') and the subject of the thread ('subject'):

```py
class CommentThread(models.Model):
  commentType = models.ForeignKey(CommentType, related_name='comment_commentType', on_delete=models.CASCADE) 
  initialComment=models.CharField(max_length=300)
  fromUser = models.ForeignKey(Person, related_name='commentthread_from_user', on_delete=models.CASCADE)
  startDate = models.DateTimeField(default=timezone.now)
  subject = models.CharField(max_length=150, blank=True)
  def __str__(self):
    return self.subject
```

The Comment entity models comments that can be added to a thread (a comment thread can have many comments, a comment can belong to only one comment thread):

```py
class Comment(models.Model):
  fromUser = models.ForeignKey(Person, related_name='comment_from_user', on_delete=models.CASCADE)
  toUser = models.ForeignKey(Person, related_name='comment_to_user', on_delete=models.CASCADE, blank=True, null=True)
  commentThread = models.ForeignKey(CommentThread, related_name='comments', on_delete=models.CASCADE) 
  comment = models.CharField(max_length=3000) 
  date = models.DateTimeField(default=timezone.now)
  def __str__(self):
    return 'from: ' + self.fromUser.username + ' to ' + self.toUser.username +": "+ self.commentThread.subject
```

The MentorProfile table stores the profile information for a user (photo, shortDescription, fullDescription):

```py
class MentorProfile(models.Model):
  photo = models.ImageField(upload_to='profile_photo', blank=False, null=False)
  shortDescription = models.CharField(max_length=150)
  fullDescription = models.TextField()
  user = models.OneToOneField(Person, related_name='user_profile', on_delete=models.CASCADE)
  def __str__(self):
    return self.user.username
  ```


## Serializers

Django requires creating serializers to serialize the data retrieved from the database and convert it into a JSON object.

## JWT_AUTH
## User serializer
I created a user serializer that checks if the password and password_confirmation fields match. If they do not match a validation error is returned. The validate_password method checks the strength of the password and it ensures that the passwords aren't too weak.
The password is hashed using Django's built-in make_password function and it is stored on the data object.

```py
class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    password_confirmation = serializers.CharField(write_only=True)
    first_name = serializers.CharField(write_only=True)
    def validate(self, data):
        password = data.pop('password')
        password_confirmation = data.pop('password_confirmation')
        if password != password_confirmation:
            raise serializers.ValidationError({'password_confirmation': 'Passwords do not match'})
        try:
            validations.validate_password(password=password)
        except ValidationError as err:
            raise serializers.ValidationError({'password': err.messages})
        data['password'] = make_password(password)
        return data
    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'password_confirmation','first_name')
```

I created serializers for the other entities, most of them are using a standard way of defining the fields to be serialized:

```py
class RoleSerializer(serializers.ModelSerializer):
  class Meta: 
    model = Role
    fields = ('id', 'name')

class SkillSerializer(serializers.ModelSerializer):
  class Meta:
    model = Skill
    fields = ('id', 'name')

class UserRelationshipSerializer(serializers.ModelSerializer):
  class Meta:
    model = UserRelationship
    fields = '__all__'

class MentorProfileSerializer(serializers.ModelSerializer):
  photo = serializers.SerializerMethodField()
  class Meta:
    model = MentorProfile
    fields = '__all__'

  def get_photo(self, obj):
        if obj.photo:
            return obj.photo.url

class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = MentorProfile
        fields = "__all__"
```

The User serializer is a custom serializer and it is using the ReadOnlyField class for most of the fields because I am serializing values from the corresponding methods from the model. For example the roles field will contain the values retrieved by calling the roles() method on the User(Person) model.

```py
class PopulateUserSerializer(serializers.ModelSerializer):
  roles = serializers.ReadOnlyField()
  skills = serializers.ReadOnlyField()
  mentees = serializers.ReadOnlyField()
  mentors = serializers.ReadOnlyField() 
  votes = serializers.ReadOnlyField()
  user_profile = MentorProfileSerializer(read_only=True)
  
  class Meta:
    model = Person
    fields = ('id', 'first_name', 'roles','skills','mentees','mentors','votes','user_profile')
```
```py
class CommentsSerializer(serializers.ModelSerializer):
  class Meta:
    model = Comment
    fields = "__all__"

class CommentThreadSerializer(serializers.ModelSerializer):

  class Meta:
    model = CommentThread
    fields = "__all__"
```

The CommentThreadDetailSerializer contains some custom code in order to retrieve the corresponding comments:

```py
class CommentThreadDetailSerializer(serializers.ModelSerializer):
  comments = serializers.SerializerMethodField()
  
  class Meta:
    model = CommentThread
    fields = ('id', 'commentType','initialComment','fromUser','startDate','subject','comments')

  def get_comments(self, instance):
        comments = instance.comments.all().order_by('-date')
        return CommentsSerializer(comments, many=True).data
```


## Views

- In order to expose the API endpoints for managing the entities, Django has its own built-in 'generic views', which can be extended.

- The Register view has only a POST endpoint, for creating a User in the database. I implemented user validation and the endpoint is sending a message if the validation was not successful:

```py
class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Registration successful'})

        return Response(serializer.errors, status=422)
```

- The Login view has a GET endpoint to retrieve a user based on the email and a POST endpoint to validate the user login information (returns a JWT token if the login information is valid). To encode the password I'm using an algorithm provided by Django.
```py
class LoginView(APIView):
    def get_user(self, email):
        try:
            return User.objects.get(email=email)
        except User.DoesNotExist:
            raise PermissionDenied({'message': 'Invalid credentials'})

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = self.get_user(email)
        if not user.check_password(password):
            raise PermissionDenied({'message': 'Invalid credentials'})
        token = jwt.encode({'sub': user.id}, settings.SECRET_KEY, algorithm='HS256')
        return Response({'token': token, 'user': user.id})
```


- UsersListView allows retrieving all users:

```py

class UsersListView(ListCreateAPIView):
  queryset = Person.objects.all()
  serializer_class = PopulateUserSerializer
  def get(self, request):
    print("users")
    users = Person.objects.all()
    serializer = PopulateUserSerializer(users, many=True)
    return Response(serializer.data)
```

- CommentDetailView endpoint allows retrieving a comment by id:

```py
class CommentDetailView(RetrieveUpdateDestroyAPIView):
  queryset = Comment.objects.all()
  serializer_class = CommentsSerializer
  def get(self, request, pk):
    queryset = Comment.objects.filter(pk=pk)
    serializer = CommentsSerializer(queryset, many=True)
    return Response(serializer.data)
```

- CommentThreadView endpoint exposes a list of comment threads ordered by startDate:

```py
class CommentThreadView(ListCreateAPIView):
  queryset = CommentThread.objects.all().order_by('-startDate')
  serializer_class = CommentThreadSerializer

```

- CommentThreadDetailView can be used in order to retrieve a CommentThread by id:

```py
class CommentThreadDetailView(RetrieveUpdateDestroyAPIView):
  queryset = CommentThread.objects.all()
  serializer_class = CommentThreadDetailSerializer
  def get(self, request, pk):
    thread = CommentThread.objects.get(pk=pk)
    serializer = CommentThreadDetailSerializer(thread)
    return Response(serializer.data)
```

```py
class MentorProfileDetailView(RetrieveUpdateDestroyAPIView):
  queryset = MentorProfile.objects.all()
  serializer_class = MentorProfileSerializer
  def get(self, request, pk):
    queryset = MentorProfile.objects.filter(user=pk)
    serializer = MentorProfileSerializer(queryset, many=True)
    return Response(serializer.data)
```


- All the available endpoints exposed by the API:

```py
urlpatterns = [
  path('', UsersListView.as_view()),
  path('users', UsersListView.as_view()),
  path('comments', CommentsListView.as_view()),
  path('users/<int:pk>/', UserDetailView.as_view()),
  path('comment/<int:pk>/', CommentDetailView.as_view()),
  path('skills', SkillsListView.as_view()),
  path('mentorprofiles', MentorProfilesListView.as_view()),
  path('roles', RolesListView.as_view()),
  path('userrelationship', UserRelationshipListView.as_view()),
  path('topvotes', TopVotesListView),
  path('commentthread', CommentThreadView.as_view()),
  path('commentthread/<int:pk>/', CommentThreadDetailView.as_view()),
  path('skills/<int:pk>/', SkillDetailView.as_view()),
  path('mentorprofiles/<int:pk>/', MentorProfileDetailView.as_view()),
  path('roles/<int:pk>/', RoleDetailView.as_view()),
  path('uploadimage/', FileUploadView.as_view())
]
```

## Front End

After setting up the backend and testing the exposed API endpoints for all the entities, I started to design the platform from the UX perspective.
My plan was to have a simple and clean UI to make the user experience as smooth as possible.

### Homepage Structure
- Top header: motivational quote, a motto of the app.

- Middle section describing how the platform works.

- Section displaying the top five voted mentors, fetched by invoking a custom back end API:

```js
  fetchTopRated() {
    axios
      .get('api/portal/topvotes')
      .then(res => {
        this.setState({ topRated: res.data })     
      })
      .catch(error => console.error(error))
  }
```

- Back End code with all the fields that exposes the /topvotes endpoint: 
```py
def TopVotesListView(request):

    rels=(UserRelationship.objects.values('mentor').annotate(topVotes=Avg("votes")).order_by("-topVotes")[:5]).annotate(name=F('mentor__first_name'), photo=F('mentor__user_profile__photo'), shortDescription=F('mentor__user_profile__shortDescription')).values('mentor','name','photo','shortDescription','topVotes')
 
    data=json.dumps(list(rels))
  
    return HttpResponse(data, content_type='application/json')
```

### Side Bar
- I created a side bar displaying the main links of the platform which makes the navigation quicker and easier. The design is customly built with SCSS.

### Register and Log in
- The state with all the fields: 
```js
    this.state = {
      register: {
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: '',
        password_confirmation: ''
      },
      logIn: {
        name: '',
        password: ''
      },
      user: '',
      errors: {},
      isRegistered: false,
      isLoginActive: true
    }
```
- The following snippet shows the updating of the state values for register and login:
```js
  handleChangeRegister(event) {
    const { name, value } = event.target
    const register = { ...this.state.register, [name]: value }
    this.setState({ register })
  }

  handleChangeLogIn(event) {
    const { name, value } = event.target
    const logIn = { ...this.state.logIn, [name]: value }
    this.setState({ logIn })
  }
```
- Registering a user:

```js
 handleSubmitRegister(event) {
    event.preventDefault()
    axios
      .post('/api/register', this.state.register)
      .then( () => this.setState({ isLoginActive: !this.state.isLoginActive }))
      .catch(err => { 
        this.setState({ errors: err.response.data })
      })
  }

  handleSubmitLogIn(event) {
    event.preventDefault()
    axios.post('/api/login', this.state.logIn)
      .then(res => {
        const token = res.data.token
        const userId = res.data.user       
        auth.setToken(token, userId)
        this.props.history.push({ pathname: '/', state: res.data.user })
      })
      .catch(err => {
        console.log(err.response.data)
        this.setState({ errors: err.response.data })
      })
  }
```

- Since I'm using the register and login forms on the same url, I had to develop the logic to direct the user either on the register form or the login form, depending on the user selection:

```js
  handleClick(e) {
    e.preventDefault()
    this.setState({ isLoginActive: !this.state.isLoginActive, errors: {} })
  }

  componentDidMount(){
    const params = queryString.parse(this.props.location.search)
    this.setState({ isLoginActive: params.current === 'register' ? false : true })
  }
```


### Create Profile Form
- On the home page I created a quick access button to create a profile.


- State initialisation:
```js
    this.state = {
      photo: null,
      shortDescription: '',
      fullDescription: ''
    }
```

- This arrow function  is updating the state based on the field values that were changed: 
```js
  handleChange = (e) => {
    e.preventDefault()
    this.setState({
      [e.target.id]: e.target.value
    })
  }
```

- For multi-media I had to write a custom function for handling the images from the form:
```js
  handleImageChange =(e) => {
    e.preventDefault()

    this.setState({
      photo: e.target.files[0]
    })   
  }
``` 

- On submit, a POST endpoint is invoked to save the profile:
```js
  handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    if (this.state.photo){
      formData.append('photo', this.state.photo)
    }
    formData.append('shortDescription', this.state.shortDescription)
    formData.append('fullDescription', this.state.fullDescription)
    formData.append('user', auth.getUserId())
    const url = 'api/portal/mentorprofiles'
    axios.post(url, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then((res) => {
        this.props.history.push('/userprofile')
        console.log(res)
        auth.setHasProfile(true)
      })
      .catch(err => console.error(err))
  }
```
### Edit Profile
- The platform allows users to change their photo or update their personal story.
- The logic is similar to the create profile page, except this time I'm using a PUT method, which allows to edit the data.

```js
  handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData()
    formData.append('shortDescription', this.state.shortDescription)
    formData.append('fullDescription', this.state.fullDescription)
    formData.append('user', auth.getUserId())
    const url = `api/portal/mentorprofiles/${this.state.profile.id}/`
    axios.put(url, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then(() => {
        this.props.history.push('/userprofile')
      })
      .catch(err => console.error(err))
  } 
```
## Challenges
(To be added)

## Victories
(To be added)

## Potential future features
(To be added)

## Lessons learned
(To be added)