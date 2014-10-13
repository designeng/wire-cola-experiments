define({
  $plugins: ["wire/dom", "wire/dom/render", "wire/on", "wire/aop", "components/form/validator/plugin/streams"],
  errorDisplay: {
    wire: {
      spec: "components/form/validator/display/spec",
      provide: {
        displaySlot: {
          $ref: 'slot'
        }
      }
    }
  },
  defaultPointMessage: "Пожалуйста, заполните это поле",
  validator: {
    create: {
      module: "components/form/validator/validator",
      args: [
        {
          strategy: {
            $ref: 'strategy'
          },
          defaultPointMessage: {
            $ref: 'defaultPointMessage'
          }
        }
      ]
    }
  },
  controller: {
    create: "components/form/validator/controller",
    properties: {
      form: {
        $ref: 'form'
      },
      fieldNames: {
        $ref: 'fieldNames'
      },
      successHandler: {
        $ref: 'successHandler'
      },
      errorDisplay: {
        $ref: 'errorDisplay'
      },
      validator: {
        $ref: 'validator'
      }
    },
    streams: {
      "focus": "before:hideError | filter:checkForRegistredError | getRegistredError | displayError",
      "keyup": "filter:checkForRegistredError | validate | displayError| highLight",
      "change": "validate | registerError | highLight",
      "submit": "validateAll"
    }
  }
});
