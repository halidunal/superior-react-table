# Superior React Table

A multilanguage, editable, addable, removable, sortable, detailed searchable, responsive table component for react.

## Installation
```sh
npm install superior-react-table
```

## Live Demo

[https://halidunal.github.io/portfolio/superior-react-table](https://halidunal.github.io/portfolio/superior-react-table)


## Example Code 
``` js
import React, { useState } from 'react'
import Table from 'superior-react-table';
import { openModal } from '../../store/services/modalService';

export default function Index(){
  const [editSelectedId,setEditSelectedId] = useState("");
  const [customers, setCustomers] = useState<ICustomer[]>(
    [
      {
        "id": "1",
        "last_name": "Doe",
        "first_name": "John",
        "email_address": "john@john.mail",
        "job_title": "Purchasing Manager",
        "is_active": false,
        "mobile_phone": "(123)555-0103",
        "profession_code": 345,
        "birthday": "1981-06-11",
        "city": "New Jersey",
        "gross_salary": "6000$-"
      },
      {
        "id": "2",
        "last_name": "Gratacos Solsona",
        "first_name": "Antonio",
        "email_address": "antonio@antonio.mail",
        "job_title": "Owner",
        "is_active": true,
        "mobile_phone": "(123)555-0101",
        "profession_code": 555,
        "birthday": "1989-09-29",
        "city": "Boston",
        "gross_salary": "-2000$"
      },
      {
        "id": "3",
        "last_name": "Axen",
        "first_name": "Thomas",
        "email_address": "thomas@thomas.mail",
        "job_title": "Purchasing Representative",
        "is_active": false,
        "mobile_phone": "(123)555-0101",
        "profession_code": 444,
        "birthday": "1976-06-25",
        "city": "Los Angelas",
        "gross_salary": "4000-6000$"
      },
      {
        "id": "4",
        "last_name": "Lee",
        "first_name": "Christina",
        "email_address": "christina@christina.mail",
        "job_title": "Purchasing Manager",
        "is_active": true,
        "mobile_phone": "(123)555-0101",
        "profession_code": 101,
        "birthday": "1993-01-15",
        "city": "New York",
        "gross_salary": "4000-6000$"
      },
      {
        "id": "5",
        "last_name": "O’Donnell",
        "first_name": "Martin",
        "email_address": "martin@marting.mail",
        "job_title": "Owner",
        "is_active": true,
        "mobile_phone": "(123)555-0101",
        "profession_code": 222,
        "birthday": "1999-11-11",
        "city": "Minneapolis",
        "gross_salary": "2000-4000$"
      },
      {
        "id": "6",
        "last_name": "Pérez-Olaeta",
        "first_name": "Francisco",
        "email_address": "francisco@francisco.mail",
        "job_title": "Purchasing Manager",
        "is_active": false,
        "mobile_phone": "(123)555-0100",
        "profession_code": 333,
        "birthday": "1992-11-01",
        "city": "Milwaukee",
        "gross_salary": "4000-6000$"
      },
      {
        "id": "7",
        "last_name": "Xie",
        "first_name": "Ming-Yang",
        "email_address": "ming@ming.mail",
        "job_title": "Owner",
        "is_active": true,
        "mobile_phone": "(123)555-0100",
        "birthday": "1997-12-10",
        "city": "Boise",
        "gross_salary": "4000-6000$"
      },
      {
        "id": "8",
        "last_name": "Andersen",
        "first_name": "Elizabeth",
        "email_address": "elizabeth@elizabeth.mail",
        "job_title": "Purchasing Representative",
        "is_active": true,
        "mobile_phone": "(123)555-0100",
        "profession_code": 444,
        "birthday": "2001-12-30",
        "city": "Portland",
        "gross_salary": "4000-6000$"
      },
      {
        "id": "9",
        "last_name": "Mortensen",
        "first_name": "Sven",
        "email_address": "sven@sven.mail",
        "job_title": "Purchasing Manager",
        "is_active": false,
        "mobile_phone": "(123)555-0101",
        "profession_code": 555,
        "birthday": "1989-05-02",
        "city": "Salt Lake City",
        "gross_salary": "2000-4000$"
      },
      {
        "id": "10",
        "last_name": "Wacker",
        "first_name": "Roland",
        "email_address": "roland@roland.mail",
        "job_title": "Purchasing Manager",
        "is_active": false,
        "mobile_phone": "(123)555-0101",
        "profession_code": 123,
        "birthday": "1990-04-20",
        "city": "Chicago",
        "gross_salary": "-2000$"
      },
      {
        "id": "11",
        "last_name": "Krschne",
        "first_name": "Peter",
        "email_address": "peter@peter.mail",
        "job_title": "Purchasing Manager",
        "is_active": true,
        "mobile_phone": "(123)555-0101",
        "profession_code": 444,
        "birthday": "1996-04-09",
        "city": "Miami",
        "gross_salary": "6000$-"
      },
      {
        "id": "12",
        "last_name": "Edwards",
        "first_name": "John",
        "email_address": "john@john.mail",
        "job_title": "Purchasing Manager",
        "is_active": false,
        "mobile_phone": "(123)555-0101",
        "profession_code": 123,
        "birthday": "1995-03-19",
        "city": "Las Vegas",
        "gross_salary": "6000$-"
      }
    ]
  );

  interface ICustomer {
    id?: any,
    last_name?: string,
    first_name?: string,
    email_address?: string,
    job_title?: string,
    is_active?: boolean,
    mobile_phone?: string,
    profession_code?: number,
    birthday?: string,
    city?: string,
    gross_salary?: string
  }

  const [editRowData, setEditRowData] = useState<ICustomer>({
    last_name: "",
    first_name: "",
    email_address: "",
    job_title: "",
    is_active: true,
    mobile_phone: "",
    profession_code: 0,
    birthday: "",
    city: "",
    gross_salary: ""
  });

  const handleEditRowChange = (event: any) => {
    var fieldName = event.target.getAttribute("name");
    var fieldValue = event.target.classList[0] !== "h-checkbox" ? event.target.value : event.target.checked;
    var newRowData: ICustomer = {...editRowData}
    newRowData[fieldName as keyof ICustomer] = fieldValue;
    setEditRowData(newRowData);
  };

  const handleEdit = (event: any, data: any) => {
    event.preventDefault();
    setEditSelectedId(data[0]);
    Object.keys(editRowData).map((item: any, key: any) => {
      editRowData[item as keyof ICustomer] = data[key+1]
    })
  };

  const handleEditRowSubmit = (event: React.SyntheticEvent, isNew: boolean) => {
    event.preventDefault();
    const editedData: ICustomer = {};
    Object.keys(editRowData).map((item: any, key: any) => {
      if(key === 0){
        editedData.id = editSelectedId;
      }
      editedData[item as keyof ICustomer] = editRowData[item as keyof ICustomer]
    })
    if(isNew) {
      customers.shift();
      editedData.id = customers.length ? ((customers[customers.length-1].id)++).toString() : "1";
      setCustomers([editedData, ...customers]);
    }else{
      let index = customers.findIndex(item => item.id === editSelectedId);
      customers[index] = editedData;
    }
    setEditSelectedId("");
  };

  const handleRemove = (id: string) => {
    setCustomers(customers.filter(item => item.id !== id))
  }

  const handleRemoveAll = () => {
    setCustomers([]);
  }

  const handleAddNew = () => {
    Object.keys(editRowData).map((item: any) => {
      editRowData[item as keyof ICustomer] = "";
    })
    setEditSelectedId("none");
    if(!customers.length) {
      setCustomers([{id:"none",...editRowData}, ...customers]);
    }else{
      if(customers[0].id !== "none") setCustomers([{id:"none",...editRowData}, ...customers]);
    }
  }

  const handleClose = (isNew: boolean) => {
    setEditSelectedId("");
    if(isNew) {
      customers.shift();
    }
  }

  const handleOpenModal = (customers: ICustomer) =>{
    openModal("edit-customer-modal", "Edit Customer Information", customers);
  }

  const tableProps = {
    theme:'dark',
    language: "en",
    addable:true,
    editable:'inline',
    removeAll:true,
    searchable:true,
    dataPerPage: 10,
    editRowData,
    editSelectedId,
    handleAddNew,
    handleEdit,
    handleEditRowChange,
    handleEditRowSubmit,
    handleRemove,
    handleRemoveAll,
    handleOpenModal,
    handleClose,
    columns:[
      {field: "last_name", title: "Last Name", sortable: true, align:"right"},
      {field: "first_name", title:"First Name", sortable: true},
      {field: "email_address", title:"Email Adress", sortable: true},
      {field: "job_title", title:"Job Title", sortable: true},
      {field: "is_active", title:"Is Active?", type: "checkbox", width: 80, align:"center"},
      {field: "mobile_phone", title:"Mobile Phone", sortable: true},
      {field: "profession_code", title:"Profession Code", type: "number", sortable: true, nullable: true},
      {field: "birthday", title:"Birthday", type: "date", sortable: true, width: 100},
      {field: "city", title:"City", sortable: true},
      {field: "gross_salary", title:"Gross Salary", sortable: true, type: "select", data:["-2000$","2000-4000$","4000-6000$","6000$-"]},
      {title: "", width:75} //command cell 
    ],
    fields:customers.map((item: ICustomer) => ([
      item.id,
      item.last_name,
      item.first_name,
      item.email_address,
      item.job_title,
      item.is_active,
      item.mobile_phone,
      item.profession_code,
      item.birthday,
      item.city,
      item.gross_salary
    ]))
  }

  return (
    <div>
      <p className='page-title'>Personel Listesi</p>
      <Table {...tableProps}/>
    </div>
  )
}

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