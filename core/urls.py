"""
URL configuration for core project.

The urlpatterns list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
# from home.views import *
# from home import views


urlpatterns = [
    # path('' ,home ,name="home"),
    path('admin/', admin.site.urls),
    path('', include('home.urls')),
    # path('', views.homepage, name='main'),
    # path('afia/', views.afia, name='afia'),
    # path('aboutus/', views.aboutus, name='aboutus'),
    # path('addblood/', views.addblood, name='addblood'),
    # path('analytics/', views.analytics, name='analytics'),
    # path('apply/', views.apply, name='apply'),
    # path('blog/', views.blog, name='blog'),
    # path('bloodavailability/', views.bloodavailability, name='bloodavailability'),
    # path('bloodgroup/', views.bloodgroup, name='bloodgroup'),
    # path('bloodpressure/', views.bloodpressure, name='bloodpressure'),
    # path('bloodstorage/', views.bloodstorage, name='bloodstorage'),
    # path('bloodsupplylevel/', views.bloodsupplylevel, name='bloodsupplylevel'),
    # path('bookappoinment/', views.bookappoinment, name='bookappoinment'),
    # path('callus/', views.callus, name='callus'),
    # path('campregistration/', views.campregistration, name='campregistration'),
    # path('canigiveblood/', views.canigiveblood, name='canigiveblood'),
    # path('careers/', views.careers, name='careers'),
    # path('corporatechallenge/', views.corporatechallenge, name='corporatechallenge'),
    # path('dashboard/', views.dashboard, name='dashboard'),
    # path('disaster-response/', views.disasterresponse, name='disaster-response'),
    # path('donorform/', views.donorform, name='donorform'),
    # path('donorlist/', views.donorlist, name='donorlist'),
    # path('faq/', views.faq, name='faq'),
    # path('form/', views.form, name='form'),
    # path('health-history/', views.healthhistory, name='health-history'),
    # path('hemoglobin/', views.hemoglobin, name='hemoglobin'),
    # path('howtogiveblood/', views.howtogiveblood, name='howtogiveblood'),
    # path('inspiring-hope/', views.inspiringhope, name='inspiring-hope'),
    # path('iron-deficiency/', views.irondeficiency, name='iron-deficiency'),
    # # path('login/', views.login, name='login'),
    # path('mission/', views.mission, name='mission'),
    # path('news/', views.news, name='news'),
    # path('offers/', views.offers, name='offers'),
    # path('outreach/', views.outreach, name='outreach'),
    # path('partners/', views.partners, name='partners'),
    # path('prepareandaftercare/', views.prepareandaftercare, name='prepareandaftercare'),
    # path('purpose/', views.purpose, name='purpose'),
    # # path('register/', views.register, name='register'),
    # path('readmore/', views.readmore, name='readmore'),
    # path('request/', views.request, name='request'),
    # path('reciept/', views.reciept, name='reciept'),
    # path('rewards-program/', views.rewardsprogram, name='rewards-program'),
    # path('setting/', views.setting, name='setting'),
    # path('trys/', views.trys, name='trys'),
    # path('volunteer/', views.volunteer, name='volunteer'),
    # path('wheretogiveblood/', views.wheretogiveblood, name='wheretogiveblood'),
    # path('whatwespecializein', views.whatwespecializein, name='whatwespecializein'),








]