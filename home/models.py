from django.db import models

# Donor Model
class Donor(models.Model):
    name = models.CharField(max_length=100)
    age = models.PositiveIntegerField(default=0)
    division = models.CharField(max_length=100, default='Chattogram')
    address = models.CharField(max_length=255, default="Unknown")
    height = models.FloatField(default=0.0)
    weight = models.PositiveIntegerField(default=0)
    blood_group = models.CharField(max_length=5, default='A+')
    rh_factor = models.CharField(max_length=2, choices=[('+', 'Positive'), ('-', 'Negative')], default='+')
    hb_level = models.FloatField(default=0.0)
    medical_issue = models.CharField(max_length=255, blank=True, default='')
    mobile = models.CharField(max_length=15, unique=True)

    def __str__(self):
        return f"{self.name} ({self.blood_group}{self.rh_factor})"

class People(models.Model):
    GENDER_CHOICES = [
        ('Male', 'Male'),
        ('Female', 'Female'),
        ('Other', 'Other'),
    ]

    first_name = models.CharField(max_length=25, default='Unknown')  # temporary default
    surname = models.CharField(max_length=25, default='User')        # temporary default
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    mobile = models.CharField(max_length=15, unique=True)
    address = models.TextField(blank=True)

    def __str__(self):
        return f"{self.first_name} {self.surname}"



# Appointment Model
class Appointment(models.Model):
    donor = models.ForeignKey(Donor, on_delete=models.CASCADE)
    user = models.ForeignKey(People, on_delete=models.CASCADE)
    date = models.DateField()
    time = models.TimeField()
    full_name = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    location = models.CharField(max_length=255, default='Unknown')
    blood_group = models.CharField(max_length=5)
    blood_component = models.CharField(max_length=100, default='Packed Cell')
    number_of_bags = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"Appointment #{self.id} - {self.full_name} on {self.date}"
