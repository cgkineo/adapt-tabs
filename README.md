# adapt-tabs

**Tabs** is a Kineo *presentation component*.

The component displays a vertically or horizontally stacked list of heading tabs. Each heading is associated with a hidden content panel. Clicking a heading toggles the visibility of its content panel. The first content panel is visible by default. Content panels may contain text and/or an image.

## Installation

If using the [Adapt CLI](https://github.com/adaptlearning/adapt-cli), run `adapt install adapt-tabs`.

Alternatively, open the */src/components* folder in a new terminal window on Mac OSX or right click the folder and select 'Git Bash Here' on Windows.

Git clone the component, making sure to delete the hidden **.git** folder from the *adapt-tabs* folder.

## Settings Overview

The attributes listed below are used in *components.json* to configure **Tabs**, and are properly formatted as JSON in [*example.json*](https://github.com/cgkineo/adapt-tabs/blob/master/example.json).

## Attributes

[**core model attributes**](https://github.com/adaptlearning/adapt_framework/wiki/Core-model-attributes): These are inherited by every Adapt component. [Read more](https://github.com/adaptlearning/adapt_framework/wiki/Core-model-attributes).

**\_component** (string): This value must be: `tabs`.

**\_classes** (string): CSS class name to be applied to the container div. The class must be predefined in one of the Less files. Separate multiple classes with a space.

**\_layout** (string): This defines the horizontal position of the component in the block. Acceptable values are `"full"`, `"left"` or `"right"`.

**\_minHeight** (number): This value defines the minimum height the item container displays. By default, the container is responsive to the content height. You only need to set this value if you want to uniform the content container size across tab items.

**instruction** (string): This optional text appears above the component. It is frequently used to
guide the learner’s interaction with the component.

**\_setCompletionOn** (string): Determines when the component registers as complete. Acceptable values are `"allItems"` and `"inview"`. `"allItems"` (the default) requires the learner to view every single tab; `"inview"` requires only that the component has been viewed (i.e. passed completely through the browser viewport).

**\_tabLayout** (string): Defines the layout of the tabs. Acceptable values are `"vertical"` and `"horizontal"`. By default, component displays `"vertical"` layout for medium screen size and below.

**\_items** (array): Multiple items may be created. Each *\_item* represents one element of the tabs component and contains values for **tabTitle**, **title**, **body**, **\_classes** and **\_graphic**.

>**tabTitle** (string): This text is displayed in the actual tab heading. Recommend keeping this title short.

>**title** (string): This text is displayed as the content panel's header. It is displayed when the tab has been selected.

>**body** (string): This content will be displayed when the learner opens this content panel. It may contain HTML.

>**\_classes** (string): An optional class that will be applied to the Tabs Item.

>**\_graphic** (object): An optional image which is displayed below the item body when the learner opens this content panel. It contains values for *src* and *alt*.

>>**src** (string): File name (including path) of the image. Path should be relative to the *src* folder (e.g., *course/en/images/tabs.jpg*).

>>**alt** (string): This text becomes the image’s alt attribute.

## Accessibility
**Tabs** has been assigned a label using the [aria-label](https://github.com/adaptlearning/adapt_framework/wiki/Aria-Labels) attribute: **ariaRegion**. This label is not a visible element. It is utilized by assistive technology such as screen readers. Should the region's text need to be customised, it can be found within the **globals** object in course.json.

## Limitations

**tabTitle** headings will be replaced by **...** if the heading is too long for the container.

----------------------------
**Version number:**  4.0.0
**Framework versions:** 5.14+
**Author / maintainer:** Kineo
**Accessibility support:** WAI AA
**RTL support:** Yes
**Cross-platform coverage:** Chrome, Chrome for Android, Firefox (ESR + latest version), Edge, IE11, Safari 12+13 for macOS/iOS/iPadOS, Opera
