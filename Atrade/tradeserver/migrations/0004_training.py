# Generated by Django 3.2.9 on 2021-11-14 13:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tradeserver', '0003_tweet'),
    ]

    operations = [
        migrations.CreateModel(
            name='Training',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('timestamp', models.CharField(max_length=20)),
                ('polarity', models.FloatField()),
                ('close', models.FloatField()),
            ],
        ),
    ]
