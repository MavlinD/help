# Generated by Django 3.2 on 2021-12-03 02:53

from django.db import migrations
import images.models


class Migration(migrations.Migration):

    dependencies = [
        ('images', '0002_alter_image_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='image',
            name='image',
            field=images.models.MyVersatileImageField(upload_to='images/', verbose_name='Image'),
        ),
    ]
