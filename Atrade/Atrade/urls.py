"""Atrade URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
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
from django.urls import path, re_path

from tradeserver import views

urlpatterns = [
    re_path(r'^$', views.index, name='home'),
    re_path(r'^get_stock_history/(?P<symbol>[A-Za-z0-9]+)/(?P<dtype>[A-Za-z0-9]+)/$', views.get_stock_history, name='get stocks history'),
    re_path(r'^find_prediction/(?P<symbol>[A-Za-z0-9]+)/$', views.find_prediction, name='get stocks history'),
    re_path(r'^get_user_data/$', views.get_user_data, name='get user data'),
    re_path(r'^add_companies', views.add_companies, name="Twinch Test"),
    re_path(r'^buy_stock', views.buy_stock, name="Twinch Test"),

    path('admin/', admin.site.urls),
]
