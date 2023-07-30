# react-template-vite

```
Using tailwind CSS + SCSS for styling
```

## **Options ✍️**

1. Check lint

```
yarn lint
```

2. Fix lint

```
yarn lint:fix
```

3. Check prettier

```
yarn prettier
```

4. Fix prettier

```
yarn prettier:fix
```

5. Fix lint and prettier

```
yarn format
```

# Lib example

https://jcoreio.github.io/material-ui-popup-state/

# Fonts Icon

https://unicons.iconscout.com/release/v3.0.0/css/line.css
https://iconscout.com/unicons/explore/line

# Structure

assets => declare images, icons, styling...
components => declare common components controlled/uncontrolled
constant => declare constant variables
contexts => declare contexts
pages => declare pages in app
hooks => declare custom hook
i18n => multiple languages
models => declare type model
layouts => declare layout in app
services => declare api request
utils => declare some configs(axios,...) and some common funtion
routes => declare routing app and routing request
stores => declare state managerment

# Styling

Trường hợp 1 số scss sẽ nằm ở tsx component, nên sẽ ko cần cái gì cũng đưa vào Folder styles.

.
├── ...
├── styles
│ ├── \_et_variables.scss # Chứa các variable
│ ├── index.scss # main tailwind
│ ├── core
│ │ ├── components
│ │ │ ├── \_forms.scss
│ │ │ ├── \_users-profile.scss
│ │ │ └── ...
│ │ ├── layouts
│ │ │ ├── \_base.scss
│ │ │ ├── \_footer.scss
│ │ │ ├── \_header.scss
│ │ │ ├── \_menu-main.scss
│ │ │ ├── \_sidebar.scss
│ │ │ └── ...
│ │ ├── pages
│ │ │ ├── auth
│ │ │ ├── animals
│ │ │ ├── permissions
│ │ │ ├── errors
│ │ │ ├── misc.scss
│ │ │ └── ...
│ │ └── fonts #fonts scss
│ │ └── \_nunitosans.scss
│ ├── vendors # Chứa scss của các thư viện ngoài
│ │ ├── jsTree
│ │ ├── react-datatable
│ │ └── ...
└── ...

# Mutiple language
Using i18next
Import your translate language to public/locales

# State managerment
Using react query for manage database and using as a basic state managerment
Use redux toolkit for more complex state