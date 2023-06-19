# Superior React Table

A multilanguage, editable, addable, removable, sortable, detailed searchable, responsive table component for react.

## Installation
```sh
npm install superior-react-table
```

## Live Demo

[Superior React Table](https://halidunal.github.io/portfolio/superior-react-table)


## Example Code
```sh

```

## API

|Prop            |Description					 |Default                      |Optional                     |Type
|----------------|-------------------------------|-----------------------------|-----------------------------|-----------------------------|
|fields|data fields||false|array
|columns|field containing *'title''*, *'align'*, *'width'*, *'sortable'*, *'visibility'*, *'type'*, *'data'*(for select) ||false|array
|columns.field|column field||false|string
|columns.title|column title (if null the title will be like columns.field)||true|string
|columns.align|cell text align. *'left'*, *'right'* or *'center'*|left|true|string
|columns.width|cell width|150|true|number
|columns.sortable|column sort|false|true|bool
|columns.nullable|cell validator (if true it run validate for the cell)|false|true|bool
|columns.visibility|column visibility for only popup edit|false|true|bool
|columns.type|field type *'string'*, *'number'*, *'date'*, *'select'* or *'checkbox'*|'string'|true|string
|columns.data|select data (if the field type is 'select')||true|string array
|language|language *'en'*, *'tr'*, *'ru'*, *'de'*, *'cn'*, *'hi'*, *'es'*, *'fr'*, *'it'*, *'ar'*|'en'|true|string
|searchable|client side search (detailed search with column title. for example:'First Name:John')|false|true|bool
|editable|editable row prop *'inline'* or *'popup'*|false|true|string
|blurEdit|if another line is clicked at the time of editing, the editing is canceled|false|true|bool
|addable|addable prop (if true the add button will be visible)|false|true|bool
|removeAll|remove all (if true the remove all button will be visible)|false|true|bool
|dataPerPage|determines how much data is displayed per page|100|true|number
|mobileViewWidth|switches to mobile view when the screen pixel is smaller than the specified pixel|500|true|number
|loading|loading prop(dynamic)|false|true|bool
|theme|styled themes *'classic'*, *'dark'*, *'gray'*, *'purple'*, *'blue'*, *'red'*|'classic'|true|string
|editRowData|empty object state of data to be edited||true|object
|editSelectedId|string state of data to be edited||true|string
|handleAddNew|function to run when add new is clicked||true|function
|handleEdit|function to run when edit row is clicked||true|function
|handleEditRowChange|function to run when row cell changed||true|function
|handleEditRowSubmit|function to run when edit check is clicked||true|function
|handleClose|function to run when edit cancel is clicked||true|function
|handleRemove|function to run when remove row is clicked||true|function
|handleRemoveAll|function to run when remove all is clicked||true|function
|handleOpenModal|function to run when edit row is clicked (if editable prop is 'popup')||true|function

## NPM

[Superior React Table](https://www.npmjs.com/package/superior-react-table)

## Licence

MIT Licensed