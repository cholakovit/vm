package validationmessages

import "github.com/go-playground/validator/v10"

func ProductMessageValidate(err error) string {
	if validationErrors, ok := err.(validator.ValidationErrors); ok {
		for _, fieldError := range validationErrors {
			switch fieldError.Field() {
				case "Name":
					switch fieldError.Tag() {
						case "required":
							return "Name is required."
						case "min":
							return "Name should have a minimum length of 2 characters."
					}
				case "Number":
					switch fieldError.Tag() {
						case "required":
							return "Number is required."
					}
				case "Price":
					switch fieldError.Tag() {
						case "required":
							return "Price is required."
					}
			}
		}
	} 
	return "Validation failed."
}