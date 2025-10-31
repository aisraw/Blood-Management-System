from gettext import translation
from django.db import transaction
from django.contrib import messages
from django.shortcuts import get_object_or_404, redirect, render
from django.contrib.auth import authenticate, login as auth_login, logout
from django.contrib.auth.models import User
from .models import Appointment, Donor, People 

def about(request):
    return render(request, 'about.html')

def home(request):
    return render(request, 'home.html')

def contact(request):
    return render(request, 'contact.html')

def apply(request):
    if request.method == 'POST':
        
        messages.success(request, 'Your application has been submitted successfully!')
        return redirect('apply')  
    return render(request, 'apply.html')

def index(request):
    if not request.user.is_staff:
        return redirect('login')

    donors = Donor.objects.all()
    people = People.objects.all()
    appointments = Appointment.objects.all()

    d = donors.count()
    p = people.count()
    a = appointments.count()

    d1 = {'d': d, 'p': p, 'a': a}
    return render(request, 'index.html', d1)


def login(request):
    error = ""
    if request.method == "POST":
        u = request.POST.get('uname')
        p = request.POST.get('pwd')
        user = authenticate(request, username=u, password=p)  
        if user is not None and user.is_staff:
            auth_login(request, user)
            error = "no"
        else:
            error = "yes"
    return render(request, 'login.html', {'error': error})



def logout_admin(request):
    if not request.user.is_staff:
        return redirect('login')
    logout(request)
    return redirect('login')

def view_donor(request):
    if not request.user.is_staff:
        return redirect('login')
    
    don = Donor.objects.all()
    d = {"don": don}
    return render(request, 'view_donor.html', d)

def delete_donor(request, pid):
    if not request.user.is_staff:
        return redirect('login')

    donor = get_object_or_404(Donor, id=pid)
    donor.delete()
    return redirect('view_donor') 

def add_donor(request):
    if not request.user.is_staff:
        return redirect('login')

    error = ""
    error_msg = ""

    if request.method == "POST":
        try:
            name = request.POST.get('name')
            age = request.POST.get('age')
            division = request.POST.get('division')
            address = request.POST.get('address')
            height = request.POST.get('height')
            weight = request.POST.get('weight')
            blood_group = request.POST.get('blood_group')
            rh_factor = request.POST.get('rh_factor')
            hb_level = request.POST.get('hb_level')
            medical_issue = request.POST.get('medical_issue')
            mobile = request.POST.get('mobile')

            # Save the donor
            Donor.objects.create(
                name=name,
                age=age,
                division=division,
                address=address,
                height=height,
                weight=weight,
                blood_group=blood_group,
                rh_factor=rh_factor,
                hb_level=hb_level,
                medical_issue=medical_issue,
                mobile=mobile
            )
            error = "no"
        except Exception as e:
            error = "yes"
            error_msg = str(e)
            import traceback
            traceback.print_exc()

    return render(request, 'add_donor.html', {'error': error, 'error_msg': error_msg})


def view_people(request):
    if not request.user.is_staff:
        return redirect('admin_login')
    
    people_list = People.objects.all()
    return render(request, 'view_people.html', {'people': people_list})

def delete_people(request, pid):
    if not request.user.is_staff:
        return redirect('admin_login')

    with transaction.atomic():  
        person = get_object_or_404(People, id=pid)
        person.delete()

        people = People.objects.all().order_by('id')

        new_id = 1
        for p in people:
            if p.id != new_id:
                People.objects.filter(id=p.id).update(id=new_id)
            new_id += 1

    return redirect('view_people')

def add_people(request):
    error = ""
    if request.method == "POST":
        first_name = request.POST['first_name']
        surname = request.POST['surname']
        gender = request.POST['gender']
        mobile = request.POST['mobile']
        address = request.POST['address']

        try:
            People.objects.create(
                first_name=first_name,
                surname=surname,
                gender=gender,
                mobile=mobile,
                address=address
            )
            error = "no"
        except Exception as e:
            error = "yes"
            error_msg = str(e)
        return render(request, 'add_people.html', locals())
    
    return render(request, 'add_people.html')



def view_appointment(request):
    if not request.user.is_staff:
        return redirect('admin_login')

    appointments = Appointment.objects.all()
    return render(request, 'view_appointment.html', {'app': appointments})


def delete_appointment(request, pid):
    if not request.user.is_staff:
        return redirect('admin_login')

    appointment = get_object_or_404(Appointment, id=pid)
    appointment.delete()
    return redirect('view_appointment')


def add_appointment(request):
    if not request.user.is_staff:
        return redirect('admin_login')

    error = ""
    error_msg = ""

    if request.method == "POST":
        try:
            donor_id = request.POST.get('donor')
            user_id = request.POST.get('user')
            full_name = request.POST.get('full_name')
            phone = request.POST.get('phone')
            date = request.POST.get('date')
            time = request.POST.get('time')
            location = request.POST.get('location')
            blood_group = request.POST.get('blood_group')
            blood_component = request.POST.get('blood_component')
            number_of_bags = int(request.POST.get('number_of_bags', 1))

            donor = Donor.objects.get(id=donor_id)
            user = People.objects.get(id=user_id)

            appointment = Appointment.objects.create(
                donor=donor,
                user=user,
                full_name=full_name,
                phone=phone,
                date=date,
                time=time,
                location=location,
                blood_group=blood_group,
                blood_component=blood_component,
                number_of_bags=number_of_bags
            )

            print("Appointment created:", appointment)
            error = "no"

        except Exception as e:
            error = "yes"
            error_msg = str(e)
            import traceback
            traceback.print_exc()

    donors = Donor.objects.all()
    people = People.objects.all()
    return render(request, 'add_appointment.html', {
        'error': error,
        'error_msg': error_msg,
        'donors': donors,
        'people': people,
    })

def faq(request): return render(request,'faq.html')

# def afia(request):  return render(request,'afia.html')

def aboutus(request):  return render(request,'aboutus.html')

def addblood(request): return render(request,'addblood.html')

def analytics(request): return render(request,'analytics.html')

def blog(request): return render(request,'blog.html')

def bloodavailability(request): return render(request,'bloodavailability.html')

def bloodgroup(request): return render(request,'bloodgroup.html')

def bloodpressure(request): return render(request,'bloodpressure.html')

def bloodstorage(request): return render(request,'bloodstorage.html')

def bloodsupplylevel(request): return render(request,'bloodsupplylevel.html')

# def bookappoinment(request): return render(request,'bookappoinment.html')

# def callus(request): return render(request,'callus.html')

def campregistration(request): return render(request,'campregistration.html')

def canigiveblood(request): return render(request,'canigiveblood.html')

def careers(request): return render(request,'careers.html')

def corporatechallenge(request): return render(request,'corporatechallenge.html')

# def contactus(request): return render(request,'contactus.html')

# def dashboard(request): return render(request,'dashboard.html')

def disasterresponse(request): return render(request,'disaster-response.html')

def donorlist(request): return render(request,'donorlist.html')

def donorform(request): return render(request,'donorform.html')



# def form(request): return render(request,'form.html')

def healthhistory(request): return render(request,'health-history.html')

def hemoglobin(request): return render(request,'hemoglobin.html')

def howtogiveblood(request): return render(request,'howtogiveblood.html')

def inspiringhope(request): return render(request,'inspiring-hope.html')

def irondeficiency(request): return render(request,'iron-deficiency.html')

# # def login(request): return render(request,'login.html')

def mission(request): return render(request,'mission.html')

def news(request): return render(request,'news.html')

def offers(request): return render(request,'offers.html')

def outreach(request): return render(request,'outreach.html')

def partners(request):  return render(request,'partners.html')

def purpose(request):  return render(request,'purpose.html')

def prepareandaftercare(request): return render(request,'prepareandaftercare.html')

def request(request): return render(request,'request.html')

def reciept(request): return render(request,'reciept.html')

def readmore(request): return render(request,'readmore.html')

def rewardsprogram(request): return render(request,'rewards-program.html')

def setting(request): return render(request,'setting.html')

def trys(request): return render(request,'trys.html')

def volunteer(request): return render(request,'volunteer.html')

def whatwespecializein(request): return render(request,'whatwespecializein.html')

def wheretogiveblood(request): return render(request,'wheretogiveblood.html')