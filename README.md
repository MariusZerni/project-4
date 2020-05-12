# Unlock

## ![GA](https://cloud.githubusercontent.com/assets/40461/8183776/469f976e-1432-11e5-8199-6ac91363302b.png)  General Assembly, Software Engineering Immersive

## Overview

Unlock was my fourth project, with General Assembly and the most complex project I've developed during the software engineering immersive course. 

For this project I decided to create a platform where people can find help, support and advice on following their dream in career changing. First you have to create a profile. If you decied that you want to help other members you can create a mentor profile where you can motivate, share external documentation, offering guidance, chat via the platform.  

On this platform you can:

- register
- create a profile (adding profile picture, motto, description)
- create a mentor profile, where members can subscribe
- vote mentors
- find mentors
- ask questions
- reply to questions



## Brief
- Build a full-stack application by making your own backend and your own front-end
- Use a Python Django API using Django REST Framework to serve your data from a Postgres database
- Create a front-end built with React
- Be deployed online and accesible to the public


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
- Git and GitHub
- Moment
- Heroku


## Approach

### Back End

### Setting Up
First I had to set up the Django app. I've followed some instructions where Django created a project directory with files like: settings, urls. 
Once I had the Django all set up I had to create a PostgreSQL Database that I called it 'portal'. In this directory Django created most of the files that I used in order to have a functional back end application. 

- Also I had to link my app to the project urls:

```py
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/portal/', include('portal.urls')),
    path('api/', include('jwt_auth.urls')),
    path('', include('frontend.urls'))

]
if settings.DEBUG:
  urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```

- And in settings:
```py
INSTALLED_APPS = [  
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'jwt_auth',
    'rest_framework',
    'frontend',
    'portal',    
]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'portal',
        'HOST': 'localhost',
        'PORT': 5432
    }
}
```


## Models
An important step it was setting the models right from the beginning. I knew from start that this is going to take some time, planning and testing the schema in Django Admin's UI and in Insomnia. 
This part it was time consuming but crucial to the structure of my app. I had to get the schema right from the start to be able to use the data as needed. Of course, that didn't go as planned, but not so bad either. I had to make some small changes while building, but over all it did work as I planned. 

## JWT.AUTH
Django provided us with a basic User. 
Here I'm making the email to be unique and required.
```py
from django.contrib.auth.models import User
User._meta.get_field('email')._unique = True
User._meta.get_field('email').blank = False
```


Because the models are related with the User I had to extend it with the Person model. Here I'm adding all the fields that I use when fetching data, in order to make less calls to the database.

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

  @property
  def topVotes(self):
    return UserRelationship.objects.values('mentor').annotate(topVotes=Sum("votes")).order_by("-topVotes")[:5] 
    

class Role(models.Model):
  name = models.CharField(max_length=30)
  def __str__(self):
    return self.name


class Skill(models.Model):
  name = models.CharField(max_length=50)
  def __str__(self):
    return self.name
```

Here we have all the relationships between the tables:
```py
class User_Role(models.Model):
  user = models.ForeignKey(Person, related_name='user_role_user', on_delete=models.CASCADE)
  role = models.ForeignKey(Role, related_name='user_role_role', on_delete=models.CASCADE)

  class Meta:
    unique_together = (('user', 'role',))

class User_Skill(models.Model):
  user = models.ForeignKey(Person, related_name='user_skills_user', on_delete=models.CASCADE)
  skill = models.ForeignKey(Skill, related_name='user_skills_skill', on_delete=models.CASCADE)

  class Meta:
    unique_together = (('user', 'skill',))

class UserRelationship(models.Model):
    mentor = models.ForeignKey(Person, related_name='mentor', on_delete=models.CASCADE)
    mentee = models.ForeignKey(Person, related_name='mentee', on_delete=models.CASCADE)
    votes = models.IntegerField(blank=True, null=True, default=0)
  
    @property
    def votesCount(self):
      return UserRelationship.objects.filter(mentor=self.mentor).aggregate(sumVotes=Sum('votes')).get("sumVotes")   
    class Meta:
      unique_together = (('mentor', 'mentee',))

class CommentType(models.Model):
  comment_type = models.CharField(max_length=30)
  def __str__(self):
    return self.comment_type

class CommentThread(models.Model):
  commentType = models.ForeignKey(CommentType, related_name='comment_commentType', on_delete=models.CASCADE) 
  initialComment=models.CharField(max_length=300)
  fromUser = models.ForeignKey(Person, related_name='commentthread_from_user', on_delete=models.CASCADE)
  startDate = models.DateTimeField(default=timezone.now)
  subject = models.CharField(max_length=150, blank=True)
  def __str__(self):
    return self.subject

class Comment(models.Model):
  fromUser = models.ForeignKey(Person, related_name='comment_from_user', on_delete=models.CASCADE)
  toUser = models.ForeignKey(Person, related_name='comment_to_user', on_delete=models.CASCADE, blank=True, null=True)
  commentThread = models.ForeignKey(CommentThread, related_name='comments', on_delete=models.CASCADE) 
  comment = models.CharField(max_length=3000) 
  date = models.DateTimeField(default=timezone.now)
  def __str__(self):
    return 'from: ' + self.fromUser.username + ' to ' + self.toUser.username +": "+ self.commentThread.subject

class MentorProfile(models.Model):
  photo = models.ImageField(upload_to='profile_photo', blank=False, null=False)
  shortDescription = models.CharField(max_length=150)
  fullDescription = models.TextField()
  user = models.OneToOneField(Person, related_name='user_profile', on_delete=models.CASCADE)
  def __str__(self):
    return self.user.username
  ```


## Serializers

Serialises the data and turns it into a JSON string after the model has retrieved the data from the database.

## JWT_AUTH
## User serializer
I've created a user serializer that will check if the password and password_confirmation fields match, if they do not match, the user is getting a validation error.

Further on I use validate_password method that checks the strength of the password. It ensures that passwords aren't too weak.

The password is hashed by using Django's built-in make_password function and I store it on the data object.

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

Here I have rest of the serialised data
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




class CommentsSerializer(serializers.ModelSerializer):
  class Meta:
    model = Comment
    fields = "__all__"


class CommentThreadSerializer(serializers.ModelSerializer):

  class Meta:
    model = CommentThread
    fields = "__all__"


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

In order to be able to use the data base operations (CRUD) Django has its own built-in called 'generic views', which you can also overwrite them.

- Register has only a post end-point, where the data is posted to the database. 
I'm checking if the data is valid and I'm sending back a response message.
```py
class RegisterView(APIView):

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Registration successful'})

        return Response(serializer.errors, status=422)
```

- Login has a get and a post end-point where the user's login information is received, checked and if valid a JWT token is returned as response. To encode the password I'm using an algorithm provided by Django.
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

- End points for Login and Register
```py
urlpatterns = [
    path('register', RegisterView.as_view()),
    path('login', LoginView.as_view())
]
```


- All the views used in my app
```py
class IsOwnerOrReadOnly(BasePermission):
  def has_object_permission(self, request, view, obj):
    if request.method in permissions.SAFE_METHODS:
      return True
    return request.user == obj.user

class UsersListView(ListCreateAPIView):
  queryset = Person.objects.all()
  serializer_class = PopulateUserSerializer
  def get(self, request):
    print("users")
    users = Person.objects.all()
    serializer = PopulateUserSerializer(users, many=True)
    return Response(serializer.data)

class CommentsListView(ListCreateAPIView):
  queryset = Comment.objects.all().order_by('-startDate')
  serializer_class = CommentsSerializer
  def get(self, request):    
    serializer = CommentsSerializer(queryset, many=True)
    return Response(serializer.data)
    
class CommentDetailView(RetrieveUpdateDestroyAPIView):
  queryset = Comment.objects.all()
  serializer_class = CommentsSerializer
  def get(self, request, pk):
    queryset = Comment.objects.filter(pk=pk)
    serializer = CommentsSerializer(queryset, many=True)
    return Response(serializer.data)

class CommentThreadView(ListCreateAPIView):
  queryset = CommentThread.objects.all().order_by('-startDate')
  serializer_class = CommentThreadSerializer

class CommentThreadDetailView(RetrieveUpdateDestroyAPIView):
  queryset = CommentThread.objects.all()
  serializer_class = CommentThreadDetailSerializer
  def get(self, request, pk):
    thread = CommentThread.objects.get(pk=pk)
    serializer = CommentThreadDetailSerializer(thread)
    return Response(serializer.data)
    
class SkillsListView(ListCreateAPIView):
  queryset = Skill.objects.all()
  serializer_class = SkillSerializer

class MentorProfilesListView(ListCreateAPIView):
  queryset = MentorProfile.objects.all()
  serializer_class = MentorProfileSerializer
  def post(self, request, *args, **kwargs):
    file_serializer = FileSerializer(data=request.data)
    if file_serializer.is_valid():
        file_serializer.save()
        return Response(file_serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MentorProfileDetailView(RetrieveUpdateDestroyAPIView):
  queryset = MentorProfile.objects.all()
  serializer_class = MentorProfileSerializer
  def get(self, request, pk):
    queryset = MentorProfile.objects.filter(user=pk)
    serializer = MentorProfileSerializer(queryset, many=True)
    return Response(serializer.data)
  
class RolesListView(ListCreateAPIView):
  queryset = Role.objects.all()
  serializer_class = RoleSerializer

class UserRelationshipListView(ListCreateAPIView):
  queryset = UserRelationship.objects.all()
  serializer_class = UserRelationshipSerializer
def TopVotesListView(request):
    rels=(UserRelationship.objects.values('mentor').annotate(topVotes=Avg("votes")).order_by("-topVotes")[:5]).annotate(name=F('mentor__first_name'), photo=F('mentor__user_profile__photo'), shortDescription=F('mentor__user_profile__shortDescription')).values('mentor','name','photo','shortDescription','topVotes')
    data=json.dumps(list(rels))
    return HttpResponse(data, content_type='application/json')

class UserDetailView(RetrieveUpdateDestroyAPIView):
  queryset = Person.objects.all()
  serializer_class = PopulateUserSerializer
  def get(self, request, pk):
    person = Person.objects.get(pk=pk)
    self.check_object_permissions(request, person)
    serializer = PopulateUserSerializer(person)
    return Response(serializer.data)

class SkillDetailView(RetrieveUpdateDestroyAPIView):
  queryset = Skill.objects.all()
  serializer_class = SkillSerializer

class RoleDetailView(RetrieveUpdateDestroyAPIView):
  queryset = Role.objects.all()
  serializer_class = RoleSerializer

class FileUploadView(APIView):
    parser_class = (FileUploadParser,)
    def post(self, request, *args, **kwargs):
      file_serializer = FileSerializer(data=request.data)
      if file_serializer.is_valid():
          file_serializer.save()
          return Response(file_serializer.data, status=status.HTTP_201_CREATED)
      else:
          return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
```


- All the end-points used in my app, 'detailedView' and 'listView':
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

Now the back end all set up, now it is time to design the platform from the UX perspective.
My plan was from the beginning to have a simple and clean Interface to make the user experience as much as simple I can. Having that in mind I've started to design the pages. 

### Homepage Structure
- When the page it gets loaded you'll see a quot.

- When scrolled down you'll find a section describing how it works.

- Also the top five voted mentors which is giving me from the backend:
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

- Back End code with all the fields: 
```py
def TopVotesListView(request):

    rels=(UserRelationship.objects.values('mentor').annotate(topVotes=Avg("votes")).order_by("-topVotes")[:5]).annotate(name=F('mentor__first_name'), photo=F('mentor__user_profile__photo'), shortDescription=F('mentor__user_profile__shortDescription')).values('mentor','name','photo','shortDescription','topVotes')
 
    data=json.dumps(list(rels))
  
    return HttpResponse(data, content_type='application/json')
```

### Side Bar
- I've created a side bar where you can find the main links of the platform in order to navigate quicker and easier. The design is built with SCSS.

### Register and Log in
- The state with all the fields that need to be send to the data base, setted as empty strings. 
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
- This code is updating the state values for register and log in properties:
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
- Here is sending the data to the data base with post methods:
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

- Becouse I'm using the register and log in form on the same page I had to develop the logic for when the user is clicking the register button to direct him on the register form, same with the log in:
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
- While you're still on the home page you can find in the top right hand corner a button that directs you to a form to create a profile.
This component is developed for getting the data from the UI and sending it to the data base.
- Here the form is rendered on the page:


- State initialised with null and empty string values:
```js
    this.state = {
      photo: null,
      shortDescription: '',
      fullDescription: ''
    }
```

- This arrow function getting the value and storing it into the state: 
```js
  handleChange = (e) => {
    e.preventDefault()
    this.setState({
      [e.target.id]: e.target.value
    })
  }
```

- Becouse we're dealing with multi-media I had to wright an extra function:
```js
  handleImageChange =(e) => {
    e.preventDefault()

    this.setState({
      photo: e.target.files[0]
    })   
  }
``` 

- And finaly I'm sending the data to the data base:
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
- At some point users will decide that they want another photo, or update information about them. For that I've created an edit form.
- The logic is simmilar with the one from above, from (create profile form), except this time I'm not using 'post' method for posting data to the data base, instead I'm using 'put' method, which allows to edit the data.
```js
  getProfile() {
    const userId = auth.getUserId()
    axios.get(`api/portal/mentorprofiles/${userId}`)
      .then((response) => {
        const profile = response.data[0] 
        this.setState({ profile })
        this.setState({ shortDescription: profile.shortDescription })
        this.setState({ fullDescription: profile.fullDescription })
      })
      .catch((error) => { 
        console.log(error)
      })
  }
```
