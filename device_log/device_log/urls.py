"""log URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
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
from rest_framework import routers
from django.urls import path, re_path, include
from rest_framework.urlpatterns import format_suffix_patterns
from log import views
from django.conf import settings
from django.conf.urls.static import static
from django.urls import include, path
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'file', views.FileUploadViewSet, basename='file')

urlpatterns = [
    path('devices/', views.DeviceManagment.as_view()),
    path('api/devices/', views.ConvertedDeviceManagment.as_view()),
    path('api/devices/<int:pk>/', views.DevicePayments.as_view()),
    path('admin/', admin.site.urls),
    path('upload/', include(router.urls)),
    path('api/upload/',views.FileUpload.as_view()),
    path('api/download/',views.FileDownloadListAPIView.as_view()),
    path('api/test/',views.Test.as_view())

]


