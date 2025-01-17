import { useState } from 'react'
import Table from '../../src/index'

function App(){
  const [editSelectedId,setEditSelectedId] = useState(0);
  const [customers, setCustomers] = useState(
    [
      {
        "id": 1,
        "last_name": "Doe",
        "first_name": "John",
        "email_address": "john@john.mail",
        "job_title": "Purchasing Manager",
        "is_active": false,
        "mobile_phone": "(123)555-0103",
        "profession_code": 345,
        "birthday": "1981-06-11",
        "city": "New Jersey",
        "gross_salary": "6000$+"
      },
      {
        "id": 2,
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
        "id": 3,
        "last_name": "Axen",
        "first_name": "Thomas",
        "email_address": "thomas@thomas.mail",
        "job_title": "Purchasing Representative",
        "is_active": false,
        "mobile_phone": "(123)555-0101",
        "birthday": "1976-06-25",
        "city": "Los Angelas",
        "gross_salary": "4000-6000$"
      },
      {
        "id": 4,
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
        "id": 5,
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
        "id": 6,
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
        "id": 7,
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
        "id": 8,
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
        "id": 9,
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
        "id": 10,
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
        "id": 11,
        "last_name": "Krschne",
        "first_name": "Peter",
        "email_address": "peter@peter.mail",
        "job_title": "Purchasing Manager",
        "is_active": true,
        "mobile_phone": "(123)555-0101",
        "profession_code": 444,
        "birthday": "1996-04-09",
        "city": "Miami",
        "gross_salary": "6000$+"
      },
      {
        "id": 12,
        "last_name": "Edwards",
        "first_name": "John",
        "email_address": "john@john.mail",
        "job_title": "Purchasing Manager",
        "is_active": false,
        "mobile_phone": "(123)555-0101",
        "profession_code": 123,
        "birthday": "1995-03-19",
        "city": "Las Vegas",
        "gross_salary": "6000$+"
      }
    ]
  );

  const [editRowData, setEditRowData] = useState({
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

  const handleEditRowChange = (event) => {
    var fieldName = event.target.getAttribute("name");
    var fieldValue = event.target.classList[0] !== "h-checkbox" ? event.target.value : event.target.checked;
    var newRowData = {...editRowData}
    newRowData[fieldName] = fieldValue;
    setEditRowData(newRowData);
  };

  const handleEdit = (event, data) => {
    event.preventDefault();
    setEditSelectedId(data[0]);
    Object.keys(editRowData).map((item, key) => {
      editRowData[item] = data[key+1]
    })
  };

  const handleEditRowSubmit = (event, isNew) => {
    event.preventDefault();
    const editedData = {};
    Object.keys(editRowData).map((item, key) => {
      if(key === 0){
        editedData.id = editSelectedId;
      }
      editedData[item] = editRowData[item]
    })
    if(isNew) {
      customers.shift();
      editedData.id = customers.length ? (customers[customers.length-1].id)+1 : 1;
      setCustomers([editedData, ...customers]);
    }else{
      let index = customers.findIndex(item => item.id === editSelectedId);
      customers[index] = editedData;
    }
    setEditSelectedId(0);
  };

  const handleRemove = (id) => {
    setCustomers(customers.filter(item => item.id !== id))
  }

  const handleRemoveAll = () => {
    setCustomers([]);
  }

  const handleAddNew = () => {
    Object.keys(editRowData).map((item) => {
      editRowData[item] = "";
    })
    setEditSelectedId(0);
    if(!customers.length) {
      setCustomers([{id:0,...editRowData}, ...customers]);
    }else{
      if(customers[0].id != 0) setCustomers([{id:0,...editRowData}, ...customers]);
    }
  }

  const handleClose = (isNew) => {
    setEditSelectedId(0);
    if(isNew) {
      setCustomers(customers.filter(item => item.id !== 0))    }
  }

  const handleOpenModal = (customer) =>{
    //openModal(customer);
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
      {field: "gross_salary", title:"Gross Salary", sortable: true, type: "select", data:["-2000$","2000-4000$","4000-6000$","6000$+"], width: 120},
      {title: "", width:75} //command cell 
    ],
    fields:customers.map((item) => ([
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
    <Table {...tableProps}/>
  )
}

export default App;
