from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        
        data['username'] = self.user.username
        
        data['is_admin'] = self.user.is_staff 
        
        try:
            profile = self.user.customer_profile
            data['names'] = profile.names
            data['first_name'] = profile.names.split()[0] if profile.names else self.user.username
            data['father_surname'] = profile.father_surname
            data['mother_surname'] = profile.mother_surname
            data['email'] = profile.email
            data['dni'] = profile.dni
            data['phone'] = profile.phone
        except Exception:
            data['first_name'] = self.user.username
            data['names'] = ''
            data['father_surname'] = ''
            data['mother_surname'] = ''
            data['email'] = self.user.email or ''
            data['dni'] = ''
            data['phone'] = ''
            
        return data