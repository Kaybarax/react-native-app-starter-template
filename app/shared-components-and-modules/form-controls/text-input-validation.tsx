import React from 'react';

export default function textInputValidation(TextInput, validators) {
  return <TextInput validateOnChange={validateOnChange.bind(null, validators)} />;
}

function validateOnChange(validators) {}
