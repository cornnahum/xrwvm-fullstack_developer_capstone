from django.db import models
from django.utils.timezone import now
from django.core.validators import MaxValueValidator, MinValueValidator

class CarMake(models.Model):
    name        = models.CharField(max_length=100)
    description = models.TextField()
    created_at  = models.DateTimeField(default=now)

    def __str__(self):
        return self.name

class CarModel(models.Model):
    SEDAN = 'SEDAN'
    SUV   = 'SUV'
    WAGON = 'WAGON'
    CAR_TYPES = [
        (SEDAN, 'Sedan'),
        (SUV,   'SUV'),
        (WAGON, 'Wagon'),
    ]

    car_make   = models.ForeignKey(CarMake, on_delete=models.CASCADE)
    dealer_id  = models.IntegerField()
    name       = models.CharField(max_length=100)
    type       = models.CharField(
                   max_length=10,
                   choices=CAR_TYPES,
                   default=SEDAN
               )
    year       = models.IntegerField(
                   default=2023,
                   validators=[
                       MinValueValidator(2015),
                       MaxValueValidator(2023)
                   ]
               )
    created_at = models.DateTimeField(default=now)

    def __str__(self):
        return f"{self.car_make.name} {self.name} ({self.year})"