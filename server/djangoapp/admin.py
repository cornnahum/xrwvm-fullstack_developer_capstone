from django.contrib import admin
from .models import CarMake, CarModel

class CarModelInline(admin.TabularInline):
    model = CarModel
    extra = 0 

@admin.register(CarMake)
class CarMakeAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'created_at')
    inlines = [CarModelInline]
    search_fields = ('name',)

@admin.register(CarModel)
class CarModelAdmin(admin.ModelAdmin):
    list_display = ('car_make', 'name', 'dealer_id', 'type', 'year', 'created_at')
    list_filter = ('car_make', 'type', 'year')
    search_fields = ('name', 'car_make__name')