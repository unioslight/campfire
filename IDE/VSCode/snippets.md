# Snippets

Snippets can be added by opening your command dropdown (Ctrl + Shft + P on Windows) and entering "Configure User Snippets".
Snippets are specific to languages.

## Typescript

```Javascript
{
  "Unios Typescript React component": {
    "prefix": "react",
    "body": [
      "/** @jsxImportSource theme-ui */",
      "import React from 'react'",
      "import { ThemeUICSSObject } from '@theme-ui/css';",
      "import { Box, Flex, Text, Heading, Paragraph } from '@theme-ui/components';",
      "import Image from 'next/image';",
      "",
      "type $1Props = {",
      "     /** Children content */",
      "     children?: React.ReactNode;",
      "     /** Optional style override */",
      "     style?: ThemeUICSSObject;",
      "}",
      "",
      "const ${1:element}Style: ThemeUICSSObject = {",
      "    ",
      "};",
      "",
      "export const $1 = ({ children, style }: $1Props): JSX.Element => {",
      "\treturn (",
      "\t\t<div sx={{...${1:element}Style, ...style}}>",
      "\t\t\t{children}",
      "\t\t</div>",
      "\t)",
      "}",
      "",
      "$1.defaultProps = {",
      "    ",
      "};",
      "",
      "$1.displayName = '$1'"
    ],
    "description": "Typescript React Component with named export"
  },
  "Unios Typescript React component (propless)": {
    "prefix": "react simple",
    "body": [
      "/** @jsxImportSource theme-ui */",
      "import React from 'react'",
      "import { ThemeUICSSObject } from '@theme-ui/css';",
      "import { Box, Flex, Text, Heading, Paragraph } from '@theme-ui/components';",
      "import Image from 'next/image';",
      "",
      "const ${1:element}Style: ThemeUICSSObject = {",
      "    ",
      "};",
      "",
      "export const $1 = (): JSX.Element => {",
      "\treturn (",
      "\t\t<div sx={${1:element}Style}>",
      "\t\t\t",
      "\t\t</div>",
      "\t)",
      "}",
      "",
      "$1.displayName = '$1'"
    ],
    "description": "Typescript React Component with named export"
  },
  "Storybook story": {
    "prefix": "story",
    "body": [
      "import React from 'react';",
      "",
      "export default {",
      "    title: 'Core/$1',",
      "    component: ${1:Text},",
      "};",
      "",
      "const Template = (args) => <$1{...args} />;",
      "",
      "export const Default = Template.bind({});",
      "Default.args = {",
      "    children: '$1 example',",
      "};"
    ],
    "description": "Storybook story"
  },

  "Theme UI Style": {
    "prefix": "themeStyle",
    "body": ["const ${1:element}Style: ThemeUICSSObject = {", "    ", "};"],
    "description": "Theme UI style object"
  },

  "Animation Variants": {
    "prefix": "variants",
    "body": ["const variants = {${1:default}: {$3}, ${2:active}: {$3}};"],
    "description": "Variants animation object"
  },

  "Configurator Context": {
    "prefix": "configcontext",
    "body": ["const configurator = useContext(ConfiguratorContext);"],
    "description": "Configurator Context"
  },

  "Modal Context": {
    "prefix": "modalcontext",
    "body": [
      "const modal = useContext(ModalContext);",
      "const { setModalContent } = modal;"
    ],
    "description": "Modal Context"
  },

  "Alert Context": {
    "prefix": "alertcontext",
    "body": ["const { setAlertContent } = useContext(AlertContext);"],
    "description": "Alert Context"
  },

  "User / useSession": {
    "prefix": "user usesession",
    "body": [
      "const { data: session, status } = useSession();",
      "const { user } = session || {};"
    ],
    "description": "User context"
  },

  "On Key Press": {
    "prefix": "keypresshandler",
    "body": [
      "const ${1:key}Pressed = useKeyPress(elementRef, '${2:key}');",
      "",
      "useEffect(() => {",
      "    if (${1:key}Pressed) {",
      "        //Do things",
      "    }",
      "}, [${1:key}Pressed]);"
    ],
    "description": "On Key Press handler"
  },

  "UseEffect Logger": {
    "prefix": "logger",
    "body": [
      "useEffect(() => {",
      "    console.log(`${1:value}`, ${1:value});",
      "}, [${1:value}]);"
    ],
    "description": "UseEffect logger for tracking value changes. Dev purposes only"
  },

  "React Hook Form": {
    "prefix": "react hook form",
    "body": [
      "/** @jsxImportSource theme-ui */",
      "import React, { useContext, useEffect, useRef, useState } from 'react';",
      "import { Controller, useForm } from 'react-hook-form';",
      "import { Flex } from 'theme-ui';",
      "import { AlertContext } from '../../../contexts/AlertContext';",
      "import { Button } from '../../core/inputs/Button';",
      "import { FormValidationError } from '../../core/inputs/FormValidationError';",
      "import { Input } from '../../core/inputs/Input';",
      "import { FormGroup } from './FormGroup';",
      "",
      "export const ${1:element} = (): JSX.Element => {",
      "    const { setAlertContent } = useContext(AlertContext);",
      "    const [loading, setLoading] = useState(false);",
      "    const [responseError, setResponseError] = useState(null);",
      "    const responseErrorDefault = 'There was a problem <DOING SOME ACTION>.';",
      "    const formRef = useRef(null);",
      "",
      "    //Form state",
      "    const { register, handleSubmit, watch, formState, control, setError, setValue, reset } = useForm();",
      "    const { errors } = formState;",
      "",
      "    // Modal forms",
      "    // const { close, isOpen } = useContext(ModalContext);",
      "    // const onReset = useTriggerCustomFormResetEvent(formRef);",
      "    //reset/populate form on loading user or open/close modal",
      "    // useEffect(() => {",
      "    //     onReset();",
      "    //     reset({});",
      "    // }, [isOpen]);",
      "",
      "    const onSubmit = async (data) => {",
      "        console.log('form data: ', data);",
      "",
      "        setLoading(true);",
      "        setResponseError(null);",
      "",
      "        //Extract any validation form values not required in payload",
      "        const { notRequired, ...payload } = data;",
      "",
      "        try {",
      "            const response = await someSubmitAction(payload);",
      "",
      "            if (response.success) {",
      "                //Do something",
      "",
      "                setAlertContent(`Done`, 'success');",
      "            } else {",
      "                console.warn('Submit was rejected by the server, with a reponse of: ', response);",
      "                setResponseError({",
      "                    message: 'There was a problem with a submission. Check the developer console for more.',",
      "                });",
      "            }",
      "        } catch (error) {",
      "            console.error(error);",
      "            setResponseError({ message: responseErrorDefault });",
      "        }",
      "",
      "        setLoading(false);",
      "    };",
      "",
      "    return (",
      "        <form onSubmit={handleSubmit(onSubmit)} noValidate ref={formRef}>",
      "            <FormGroup>",
      "                <Input",
      "                    id=\"field-name\"",
      "                    label=\"Enter value\"",
      "                    {...(register('fieldName'),",
      "                    {",
      "                        required: { value: true, message: 'Required' },",
      "                    })}",
      "                />",
      "                <FormValidationError error={errors.fieldName} />",
      "            </FormGroup>",
      "            <FormGroup isLast style={{ mt: 6, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>",
      "                <FormValidationError error={responseError} style={{ mr: 4 }} />",
      "                <Button type=\"submit\" loading={loading}>",
      "                    Submit",
      "                </Button>",
      "            </FormGroup>",
      "        </form>",
      "    );",
      "};",
      "",
      "$1.displayName = '$1';"
    ],
    "description": "React hook form state"
  },
  "Register Form Input Prop": {
    "prefix": "registerinput",
    "body": [
      "{...register('${1:inputname}', {",
      "    required: { value: true, message: '${2:input label} is required' },",
      "})}"
    ],
    "description": "Prop for input components to register them in a react hook form"
  }
}




```
