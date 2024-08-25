# NgBulma

This project is currently v0.1.0 and is under construction. More features and components will come with time.

Please let me know at sophia@sophiamckell.com if you would like to help contribute or have technical questions for now, as this is still a new passion project.

##### Notes
Bulma is compatible with all icon font libraries, though this library utilizes [Font Awesome 5](https://fontawesome.com/v5/search) in the same manner that the documentation does.

## Components

These components are all standalone, and can be imported into other components in the imports array should they be used in that component's template.

#### Select `<ngb-select>`

A dropdown with a filtering input embedded in the button
`import {NgbSelectComponent} from 'ng-bulma/select';`

|Attribute    |Description |Default |
|-------------|------------|--------|
|`Input` [isUp] |Determines if the combobox opens upward|`false`|
|`Input` [placeholder] |gives placeholder text to the input | `''` |
|`Input` [items] |An array of strings to use as the options |`[]`|
|`Input` [isHoverable] | a boolean to determine if dropdownelements are highlighted on hover | `true` |

