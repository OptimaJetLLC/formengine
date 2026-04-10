window.viewerBundleForm = JSON.stringify({
  "version": "1",
  "errorType": "RsErrorMessage",
  "form": {
    "key": "Screen",
    "type": "Screen",
    "props": {},
    "children": [
      {
        "key": "container",
        "type": "RsContainer",
        "props": {},
        "css": {
          "any": {
            "object": {
              "flexDirection": "row"
            }
          }
        },
        "children": [
          {
            "key": "firstName",
            "type": "RsInput",
            "props": {
              "label": {
                "computeType": "localization"
              },
              "placeholder": {
                "computeType": "localization"
              }
            },
            "schema": {
              "validations": [
                {
                  "key": "required"
                }
              ]
            }
          },
          {
            "key": "lastName",
            "type": "RsInput",
            "props": {
              "placeholder": {
                "computeType": "localization"
              },
              "label": {
                "computeType": "localization"
              }
            },
            "schema": {
              "validations": [
                {
                  "key": "required"
                }
              ]
            }
          }
        ]
      },
      {
        "key": "birthDate",
        "type": "RsDatePicker",
        "props": {
          "oneTap": {
            "value": true
          },
          "label": {
            "computeType": "localization"
          }
        },
        "schema": {
          "validations": [
            {
              "key": "min",
              "args": {
                "value": "1900-01-07T12:25:37.000Z"
              }
            }
          ]
        }
      },
      {
        "key": "submit",
        "type": "RsButton",
        "props": {
          "color": {
            "value": "blue"
          },
          "appearance": {
            "value": "primary"
          },
          "children": {
            "computeType": "localization"
          }
        },
        "events": {
          "onClick": [
            {
              "type": "common",
              "name": "validate",
              "args": {
                "failOnError": true
              }
            },
            {
              "type": "custom",
              "name": "onSubmit"
            }
          ]
        }
      }
    ]
  },
  "localization": {
    "en-US": {
      "lastName": {
        "component": {
          "placeholder": "Enter your last name",
          "label": "Last Name"
        }
      },
      "firstName": {
        "component": {
          "label": "First Name",
          "placeholder": "Enter your first name"
        }
      },
      "birthDate": {
        "component": {
          "label": "Birth Date"
        }
      },
      "submit": {
        "component": {
          "children": "Submit"
        }
      }
    },
    "ar-EG": {
      "lastName": {
        "component": {
          "placeholder": "أدخل اسم عائلتك",
          "label": "اللقب"
        }
      },
      "firstName": {
        "component": {
          "label": "الاسم الأول",
          "placeholder": "أدخل اسمك الأول"
        }
      },
      "birthDate": {
        "component": {
          "label": "تاريخ الميلاد"
        }
      },
      "submit": {
        "component": {
          "children": "إرسال"
        }
      }
    }
  },
  "languages": [
    {
      "code": "en",
      "dialect": "US",
      "name": "English",
      "description": "American English",
      "bidi": "ltr"
    },
    {
      "code": "ar",
      "dialect": "EG",
      "name": "عرب",
      "description": "Arabic (Egypt)",
      "bidi": "rtl"
    }
  ],
  "defaultLanguage": "en-US"
})
