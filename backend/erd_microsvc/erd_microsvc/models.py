from django.db import models
import jsonfield



class Category_schema(models.Model):
    key_id = models.CharField(primary_key= True, max_length=100,unique=True)
    category = models.CharField(max_length=100)
    address = jsonfield.JSONField()
    schema = jsonfield.JSONField()
    category_rank = models.IntegerField() 

    class Meta:
        # Gives the proper plural name for admin
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.tutorial_category

class Users(models.Model):
    id = models.CharField(max_length=100,primary_key=True,unique=True)
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=200)
    password = models.CharField(max_length=100)
    hash_password = models.CharField(max_length=100)
    mobile_no = models.BigIntegerField()#will update to phone-number field latter
    unique_hash = models.CharField(max_length=100)
    schema_key = models.ForeignKey(Category_schema,default=1,verbose_name="Category", on_delete=models.SET_DEFAULT)
    engine_name = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)
    create_ts = models.DateTimeField(auto_now_add=True)
    address = jsonfield.JSONField()





    