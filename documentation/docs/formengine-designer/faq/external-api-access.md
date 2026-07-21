---
sidebar_position: 1
title: Access to external API from Form Designer
slug: /formengine-designer/faq/external-api-access
description: You can access the desired API via custom actions, which are called on a specific event, such as onClick
---

# Access to external API from Form Designer

You can access the desired API via [custom actions](/formengine-designer/features/actions#custom-actions), which are called on a specific
event, such as `onClick`.

1. Adding a custom action to `FormBuilder` props:

   ```tsx
   <FormBuilder
     actions={{
       callMyApi: ActionDefinition.functionalAction((e, args) => {
         const {param1, param2, param3} = args
         MyApi.call(param1, param2, param3)
       }, {
         param1: 'string',
         param2: 'boolean',
         param3: 'number'
       })
     }}
   />
   ```

2. Adding a custom action to a component in the editor:
   ![Access external API 01](/assets/faq/access-external-api-01.png)

3. Setting the action parameters:
   ![Access external API 02](/assets/faq/access-external-api-02.png)
