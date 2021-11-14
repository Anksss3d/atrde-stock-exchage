from django.db import models

# Create your models here.
class Company(models.Model):
    company_id = models.AutoField(primary_key=True)
    symbol = models.CharField(max_length=50)
    name = models.CharField(max_length=1000)
    description = models.CharField(max_length=2500)
    employees = models.CharField(max_length=50)
    address = models.CharField(max_length=75)
    zip = models.CharField(max_length=10)
    country = models.CharField(max_length=50)


class History(models.Model):
    id = models.AutoField(primary_key=True)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    timestamp = models.CharField(max_length=20)
    high = models.FloatField()
    low = models.FloatField()
    open = models.FloatField()
    close = models.FloatField()
    volume = models.BigIntegerField(default=0)
    dtype = models.CharField(max_length=10)

class Tweet(models.Model):
    id = models.AutoField(primary_key=True)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    timestamp = models.CharField(max_length=20)
    tweet = models.CharField(max_length=500)
    polarity = models.FloatField()


class Training(models.Model):
    id = models.AutoField(primary_key=True)
    timestamp = models.CharField(max_length=20)
    polarity = models.FloatField()
    close = models.FloatField()

class Stock(models.Model):
    id = models.AutoField(primary_key=True)
    user_email = models.CharField(max_length=100)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    count = models.FloatField()
    buying_price = models.FloatField()
    timestamp = models.CharField(max_length=20)




