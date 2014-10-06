define({
  $plugins: ["wire/debug", "wire/dom", "wire/dom/render", "wire/on", "core/plugin/template/hb", "core/plugin/validate"],
  formController: {
    create: "components/form/controller",
    ready: {
      onReady: {}
    },
    properties: {
      formView: {
        $ref: 'formView'
      }
    }
  },
  formPattern: {
    module: "hbs!components/form/template"
  },
  formViewTemplate: {
    templateSource: {
      pattern: {
        $ref: 'formPattern'
      },
      fillWith: {
        firstName: "firstName",
        lastName: "lastName",
        phone: "phone",
        email: "email",
        save: "save",
        clear: "clear"
      }
    }
  },
  formView: {
    render: {
      template: {
        $ref: 'formViewTemplate'
      }
    },
    insert: {
      at: {
        $ref: 'slot'
      }
    },
    validate: {
      fields: {
        firstName: {
          "not longer than 10 characters": {
            rule: function(value) {
              if (value.length > 10) {
                return false;
              } else {
                return true;
              }
            },
            message: "Should not be longer than 10 characters!"
          },
          "not shorter than 2 characters": {
            rule: function(value) {
              if (value.length < 2) {
                return false;
              } else {
                return true;
              }
            },
            message: "Should not be shorter than 2 characters!"
          }
        },
        email: {
          "should have word '@'": {
            rule: /@/g,
            message: "Should have word '@'!"
          }
        }
      },
      afterValidation: {
        $ref: "formController.afterValidation"
      },
      pluginInvoker: {
        $ref: "formController.pluginInvoker"
      }
    }
  },
  anotherFormPattern: {
    module: "hbs!components/form/anotherForm"
  },
  anotherFormViewTemplate: {
    templateSource: {
      pattern: {
        $ref: 'anotherFormPattern'
      },
      fillWith: {
        phone: "phone",
        address: "address",
        save: "save data",
        clear: "clear data"
      }
    }
  },
  anotherFormView: {
    render: {
      template: {
        $ref: 'anotherFormViewTemplate'
      }
    },
    insert: {
      at: {
        $ref: 'dom.first!#another_form'
      }
    },
    validate: {
      fields: {
        address: {
          "not longer than 20 characters": {
            rule: function(value) {
              if (value.length > 20) {
                return false;
              } else {
                return true;
              }
            },
            message: "Should not be longer than 10 characters!"
          },
          "not shorter than 5 characters": {
            rule: function(value) {
              if (value.length < 5) {
                return false;
              } else {
                return true;
              }
            },
            message: "Should not be shorter than 5 characters!"
          }
        },
        phone: {
          "should have only numbers": {
            rule: /^\d+$/,
            message: "Should have only numbers!"
          }
        }
      }
    }
  }
});
