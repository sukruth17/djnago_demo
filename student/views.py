from django.shortcuts import render

import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Student

@csrf_exempt
def register_student(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            first_name = data.get('first_name', '')
            last_name = data.get('last_name', '')
            email = data.get('email')
            password = data.get('password')
            major = data.get('major', '')

            if not email or not password:
                return JsonResponse({'error': 'Email and password are required'}, status=400)

            if Student.objects.filter(email=email).exists():
                return JsonResponse({'error': 'Email already exists'}, status=400)

            stud = Student.objects.create(
                first_name=first_name,
                last_name=last_name,
                email=email,
                password=password,
                major=major
            )
            return JsonResponse({'message': 'Student registered successfully', 'student_id': stud.id}, status=201)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

    return JsonResponse({'error': 'Only POST method allowed'}, status=405)

@csrf_exempt
def login_student(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data.get('email')
            password = data.get('password')

            if not email or not password:
                return JsonResponse({'error': 'Email and password are required'}, status=400)

            student = Student.objects.filter(email=email, password=password).first()

            if student:
                return JsonResponse({'message': 'Login successful', 'student_id': student.id}, status=200)
            else:
                return JsonResponse({'error': 'Invalid email or password'}, status=401)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    
    return JsonResponse({'error': 'Only POST method allowed'}, status=405)

@csrf_exempt
def get_all_students(request):
    if request.method == 'GET':
        students = Student.objects.all().values()
        return JsonResponse(list(students), safe=False)
    
    return JsonResponse({'error': 'Only GET method allowed'}, status=405)

@csrf_exempt
def get_student_by_email(request, email):
    if request.method == 'GET':
        try:
            student = Student.objects.get(email=email)
            
            data = {
                "id": student.id,
                "first_name": student.first_name,
                "last_name": student.last_name,
                "email": student.email,
                "major": student.major,
                "enrollment_date": student.enrollment_date
            }
            return JsonResponse(data)
        
        except Student.DoesNotExist:
            return JsonResponse({"error": "Student not found"}, status=404)
    
    return JsonResponse({'error': 'Only GET method allowed'}, status=405)

@csrf_exempt
def get_student_by_email_body(request):
    if request.method == 'POST':
        try:
            # Load the JSON data from the request body
            data = json.loads(request.body)
            email = data.get('email')

            if not email:
                return JsonResponse({'error': 'Email is required in the body'}, status=400)

            # Find the student with the matching email
            student = Student.objects.get(email=email)
            
            student_info = {
                "id": student.id,
                "first_name": student.first_name,
                "last_name": student.last_name,
                "email": student.email,
                "major": student.major,
                "enrollment_date": student.enrollment_date
            }
            return JsonResponse(student_info)
        
        except Student.DoesNotExist:
            return JsonResponse({"error": "Student not found"}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    
    return JsonResponse({'error': 'Only POST method allowed for this endpoint'}, status=405)


