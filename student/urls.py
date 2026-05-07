from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register_student, name='register_student'),
    path('login/', views.login_student, name='login_student'),
    path('get-all/', views.get_all_students, name='get_all_students'),
    path('get-by-email/<str:email>/', views.get_student_by_email, name='get_student_by_email'),
    path('get-by-email-body/', views.get_student_by_email_body, name='get_student_by_email_body'),
]

