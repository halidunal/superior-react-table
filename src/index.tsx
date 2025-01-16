import React from 'react';
import "./style.css";

export default function Table(props: any) {
  const [searchText, setSearchText] = React.useState("");
  const [sorting, setSorting] = React.useState<{key: number, orderBy: string}>({key: 0, orderBy:""});
  const [numOfFilteredData, setNumOfFilteredData] = React.useState(0);
  const [numOfPages, setNumOfPages] = React.useState(1);
  const [pagingDropdownValue, setPagingDropdownValue] = React.useState(1);
  const dataPerPage = props.dataPerPage ? props.dataPerPage : 100;
  const blurEdit = props.blurEdit ? props.blurEdit : false;
  const theme = props.theme ? props.theme : "classic";
  const mobileViewWidth = props.mobileViewWidth ? props.mobileViewWidth : 500;
  const dataRange = [pagingDropdownValue*dataPerPage-dataPerPage, pagingDropdownValue*dataPerPage];
  const firstInputRef: any = React.useRef(null);
  type langType = {en: object, tr: object, ru: object, cn: object, hi: object, es: object, fr: object, it: object, ar: object, de: object}
  const language = props.language ? props.language : "en";

  const languages = {
    en: {
      "search": "Search...",
      "removeAll": "Remove All",
      "addRow": "Add Row",
      "edit": "Edit",
      "remove": "Remove",
      "save": "Save",
      "cancel": "Cancel",
      "warning": "This field is required!",
      "pagingInfo": "Showing <b>" + numOfFilteredData + "</b> Out of <b>" + props.fields.length + "</b> Total Items"
    },
    tr: {
      "search": "Ara...",
      "removeAll": "Tümünü Sil",
      "addRow": "Satır Ekle",
      "edit": "Düzenle",
      "remove": "Sil",
      "save": "Kaydet",
      "cancel": "İptal",
      "warning": "Bu alan zorunludur!",
      "pagingInfo": "Toplam <b>" + props.fields.length + "</b> Öğeden <b>" + numOfFilteredData + "</b> Tanesi Gösteriliyor"
    },
    ru: {
      "search": "поиск...",
      "removeAll": "убрать все",
      "addRow": "Добавить ряд",
      "edit": "редактировать",
      "remove": "удалить",
      "save": "сохранять",
      "cancel": "отмена",
      "warning": "Это поле обязательно к заполнению!",
      "pagingInfo": "Показаны <b>" + numOfFilteredData + "</b> из <b>" + props.fields.length + "</b> элементов"
    },
    cn: {
      "search": "搜索...",
      "removeAll": "移除所有",
      "addRow": "添加行",
      "edit": "编辑",
      "remove": "消除",
      "save": "节省",
      "cancel": "取消",
      "warning": "此字段是必需的!",
      "pagingInfo": "总共 <b>" + numOfFilteredData + "</b> 个元素中展示了 <b>" + props.fields.length + "</b> 个"
    },
    hi: {
      "search": "खोज...",
      "removeAll": "सभी हटाएं",
      "addRow": "लाइन जोड़ो",
      "edit": "संपादन करना",
      "remove": "निकालना",
      "save": "बचाना",
      "cancel": "रद्द करना",
      "warning": "यह फ़ील्ड आवश्यक है!",
      "pagingInfo": "कुल <b>" + numOfFilteredData + "</b> तत्वों में से <b>" + props.fields.length + "</b> दिखाए जा रहे हैं"
    },
    es: {
      "search": "Buscar...",
      "removeAll": "Eliminar Todos",
      "addRow": "Añadir Fila",
      "edit": "Editar",
      "remove": "Eliminar",
      "save": "Ahorrar",
      "cancel": "Cancelar",
      "warning": "¡Este campo es obligatorio!",
      "pagingInfo": "Se Están Mostrando <b>" + props.fields.length + "</b> de un Total de <b>" + numOfFilteredData + "</b> Elementos"
    },
    fr: {
      "search": "Recherche...",
      "removeAll": "Enlever tout",
      "addRow": "Ajouter une Rangée",
      "edit": "Modifier",
      "remove": "Supprimer",
      "save": "Sauvegarder",
      "cancel": "Annuler",
      "warning": "Ce champ est obligatoire!",
      "pagingInfo": "<b>" + props.fields.length + "</b> Sont Affichés Sur un Total de <b>" + numOfFilteredData + "</b> Êléments"
    },
    it: {
      "search": "Ricerca...",
      "removeAll": "Rimuovi Tutto",
      "addRow": "Aggiungi Riga",
      "edit": "Modificare",
      "remove": "Rimuovere",
      "save": "Salva",
      "cancel": "Annulla",
      "warning": "Questo campo è obbligatorio!",
      "pagingInfo": "Vengono Mostrati <b>" + props.fields.length + "</b> su un Totale di <b>" + numOfFilteredData + "</b> Elementi"
    },
    ar: {
      "search": "...يبحث",
      "removeAll": "حذف الكل",
      "addRow": "اضف سطر",
      "edit": "يحرر",
      "remove": "يزيل",
      "save": "يحفظ",
      "cancel": "يلغي",
      "warning": "!هذه الخانة مطلوبه",
      "pagingInfo": "عنصرًا <b>" + numOfFilteredData + "</b> من إجمالي <b>" + props.fields.length + "</b> يتم عرض"
    },
    de: {
      "search": "Suchen...",
      "removeAll": "Alles Entfernen",
      "addRow": "Zeile Hinzufügen",
      "edit": "Bearbeiten",
      "remove": "Entfernen",
      "save": "Speichern",
      "cancel": "Stornieren",
      "warning": "Dieses Feld ist Erforderlich!",
      "pagingInfo": "Es Werden <b>" + props.fields.length + "</b> Von Insgesamt <b>" +  numOfFilteredData + "</b> Elementen Angezeigt"
    },
  }

  let isSearchTextDetailed = false, columnText = "", columnIndex = 0, colonIndex = 0, tempData: any = [], detailedSearchText = "";
  props.columns.map((column: any) => tempData.push(column.title));
  const filteredData = props.fields.filter(
    (items: any) => {
      if(searchText[0] !== ":" && searchText.includes(":") && searchText.match(/:/g)?.length === 1) isSearchTextDetailed = true;
      if(isSearchTextDetailed){
        colonIndex = searchText.indexOf(":");
        columnText = searchText.substring(0, colonIndex);
        columnIndex = tempData.indexOf(columnText)+1;
        detailedSearchText = searchText.substring(colonIndex+1, searchText.length).toLocaleLowerCase("TR");
        return items[columnIndex].toString().toLocaleLowerCase("TR").includes(detailedSearchText);
      }else{
        return items.some((item: any) => item?.toString().toLocaleLowerCase("TR").includes(searchText.toLocaleLowerCase()));
      }
    }
  ).sort((a: any, b: any) => {
    if(sorting?.orderBy === ""){
      return;
    }
    if(sorting?.orderBy === 'asc'){
      return a[sorting.key+1]?.toString().localeCompare(b[sorting.key+1]);
    }
    if(sorting?.orderBy === 'desc'){
      return b[sorting.key+1]?.toString().localeCompare(a[sorting.key+1]);
    }
  });

  const [windowWidth,setWindowWidth] = React.useState(window.innerWidth);

  const handleWindowResize = () => {
    setWindowWidth(window.innerWidth);
  };

  React.useEffect(()=>{
    setNumOfFilteredData(filteredData.length);
    setNumOfPages(Math.ceil(numOfFilteredData/dataPerPage));
    document.getElementsByClassName("table-paging-right")[0] && (document.getElementsByClassName("table-paging-right")[0].innerHTML = languages[language as keyof langType].pagingInfo)
    window.addEventListener('resize', handleWindowResize);
  },[filteredData])

  const handleChangePagingDropdown = (event: React.BaseSyntheticEvent) => {
    setPagingDropdownValue(event.target.value);
  };

  const handleEditRowChange = (event: React.BaseSyntheticEvent, type: string) => {
    props.handleEditRowChange(event);
  }

  const handleChangeTableDropdown = (event: React.BaseSyntheticEvent) => {
    event.target.setAttribute('value', event.target.value);
    props.handleEditRowChange(event);
  };

  const handleChangeSearchText = (event: React.BaseSyntheticEvent) => {
    setSearchText(event.target.value);
    setPagingDropdownValue(1);
  }

  const handleAddNew = () => {
    setSearchText("");
    setPagingDropdownValue(1);
    document.getElementsByClassName("table-container")[0]?.scroll(0,0);
    props.handleAddNew();
    setTimeout(()=> firstInputRef?.current.focus());
  }

  const handleRemoveAll = () => {
    document.getElementById("cancel")?.click();
    setPagingDropdownValue(1);
    document.getElementsByClassName("table-container")[0]?.scroll(0,0);
    props.handleRemoveAll();
  }

  const handleSave = (event: any, id: string | number | undefined) => {
    var emptyList: boolean[] = [];
    var recordable = true;
    var inputs = document.querySelectorAll("#validate-input");
    for(let i = 0; i < props.columns.length-1; i++){
      let elem = i+1;
      if(inputs[i]?.classList[0] !== "nullable" && inputs[i]?.classList[0] !== "h-checkbox"){
        document.getElementById("warning" + elem)?.setAttribute("style", "display: inline");
        inputs[i]?.getAttribute("value") === "" ? emptyList[i] = false : emptyList[i] = true;
      }
    }
    emptyList.map((item: boolean) => {
      if(item === false) return recordable = false;
    })
    if(recordable) id == 0 || id === undefined ? props.handleEditRowSubmit(event, true) : props.handleEditRowSubmit(event, false);
  }

  const handleKeyUpInput = (event: any) => {
    if(event.key === "Enter") {
      var next = event.target.parentNode.nextSibling.firstChild;
      next.nodeName === "DIV" ? document.getElementById("save")?.click() : next.focus();
      if(next.type === "date" || next.type === "select-one"){ return }else next.nodeName !== "DIV" && next.select();
    }else if(event.key === "Escape"){
      document.getElementById("cancel")?.click();
    }
  }

  const formatValue = (value: any, type: string) => {
    var formatedValue = value;
    if(type === "date"){
      var year = value.slice(0,4);
      var month = value.slice(5,7);
      var day = value.slice(8,10);
      formatedValue = day + "." + month + "." + year;
    }else if(type === "checkbox"){
      return CheckBox({checked: value});
    }
    return formatedValue;
  }

  const onBlurInput = (event: any) => {
    !event.relatedTarget && props.handleClose(true);
  }

  const CheckBox = (checkProps: any) => {
    return(
      <input type='checkbox' disabled checked={checkProps.checked} className="h-checkbox"></input>
    )
  }

  const Dropdown = (selectProps: any) => {
    return (
      <select
        onChange={selectProps.onChange}
        name={selectProps.name}
        value={selectProps.value}
        className={selectProps.className + " dropdown"}
        style={selectProps.width && {width: selectProps.width}}
        id={selectProps.id}
        onBlur={selectProps.onBlur}>
        {selectProps.data.map((item: any, key: any) => (
          <option key={key} value={item} className="dropdown-item" onTouchMove={e => e.preventDefault()}>{item}</option>
        ))}
      </select>
    )
  }

  const Paging = () => {
    return(
      <div className={'table-paging table-paging-'+theme}>
        {[0].map((item, key: any) => {
          var data = numOfPages ? Array.from({length: numOfPages}, (x, i: any) => i+1) : [1];
          return(
            <div className='table-paging-left' key={key}>
              <AngleDoubleLeftIcon onClick={() => setPagingDropdownValue(data[0])}/>
              <AngleLeftIcon onClick={() => pagingDropdownValue != data[0] && setPagingDropdownValue(pagingDropdownValue-1)}/>
              <Dropdown data={data} value={pagingDropdownValue} onChange={handleChangePagingDropdown} width="50px"/>
              <AngleRightIcon onClick={() => pagingDropdownValue != data[data.length-1] && setPagingDropdownValue(pagingDropdownValue+1)}/>
              <AngleDoubleRightIcon onClick={() => setPagingDropdownValue(data[data.length-1])}/>
            </div>
          )}
        )}
        <div className={"table-paging-right table-paging-right-"+theme}></div>
      </div>
    )
  }

  const CommandCell = (cellProps: any) => {
    const editSaveButtonStyle = windowWidth > mobileViewWidth ? {marginRight: 4} : {marginRight: 4, width: "100%"};
    const removeCloseButtonStyle = windowWidth > mobileViewWidth ? {} : { width: "100%"};
    const handleOpenModal = (index: any) => {
      props.handleOpenModal({data: filteredData[index], columns: props.columns});
    }
    return(
      <>
        {props.editable && props.editSelectedId === cellProps.items[0] || cellProps.items[0] === undefined ? (
          <div className={windowWidth > mobileViewWidth ? "" : "command-cell"}>
            <button id="save" style={editSaveButtonStyle} className={"h-button h-"+theme+"-primary"} onClick={(e) => {handleSave(e, cellProps.items[0])}} title={languages[language as keyof langType].save}>
              {windowWidth > mobileViewWidth ? <CheckIcon/> : <>{languages[language as keyof langType].save}</>}
            </button>
            <button id="cancel" style={removeCloseButtonStyle} className={"h-button h-"+theme+"-secondary"} title={languages[language as keyof langType].cancel}
              onClick={() => {cellProps.items[0] == 0 || cellProps.items[0] === undefined ? props.handleClose(true) : props.handleClose(false)}}>
              {windowWidth > mobileViewWidth ? <TimesIcon/> : <>{languages[language as keyof langType].cancel}</>}
            </button>
          </div>
          ) : props.editable && (
          <div className={windowWidth > mobileViewWidth ? "" : "command-cell"}>
            <button style={editSaveButtonStyle} className={"h-button h-"+theme+"-primary"} title={languages[language as keyof langType].edit} id={cellProps.index}
              onClick={(e) => filteredData[0][0] != 0 && props.editable === 'inline' ? props.handleEdit(e, cellProps.items) : props.editable ==='popup' && handleOpenModal(e.currentTarget.id)}>
              {windowWidth > mobileViewWidth ? <PencilIcon/> : <>{languages[language as keyof langType].edit}</>}
            </button>
            <button style={removeCloseButtonStyle} className={"h-button h-"+theme+"-secondary"} onClick={() => props.handleRemove(cellProps.items[0])} title={languages[language as keyof langType].remove}>
              {windowWidth > mobileViewWidth ? <TrashIcon/> : <>{languages[language as keyof langType].remove}</>}
            </button>
          </div>
        )}
      </>
    )
  }

  const PlusIcon = () => <svg width="1em" height="1em" viewBox="0 0 448 512" fill="currentColor"><path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path></svg>
  const TrashIcon = () => <svg width="1em" height="1em" viewBox="0 0 448 512" fill="currentColor"><path d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path></svg>
  const PencilIcon = () => <svg width="1em" height="1em" viewBox="0 0 512 512" fill="currentColor"><path d="M497.9 142.1l-46.1 46.1c-4.7 4.7-12.3 4.7-17 0l-111-111c-4.7-4.7-4.7-12.3 0-17l46.1-46.1c18.7-18.7 49.1-18.7 67.9 0l60.1 60.1c18.8 18.7 18.8 49.1 0 67.9zM284.2 99.8L21.6 362.4.4 483.9c-2.9 16.4 11.4 30.6 27.8 27.8l121.5-21.3 262.6-262.6c4.7-4.7 4.7-12.3 0-17l-111-111c-4.8-4.7-12.4-4.7-17.1 0zM124.1 339.9c-5.5-5.5-5.5-14.3 0-19.8l154-154c5.5-5.5 14.3-5.5 19.8 0s5.5 14.3 0 19.8l-154 154c-5.5 5.5-14.3 5.5-19.8 0zM88 424h48v36.3l-64.5 11.3-31.1-31.1L51.7 376H88v48z"></path></svg>
  const CheckIcon = () => <svg width="1em" height="1em" viewBox="0 0 512 512" fill="currentColor"><path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg>
  const TimesIcon = () => <svg width="1em" height="1em" viewBox="0 0 352 512" fill="currentColor"><path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>
  const ExclamationCircleIcon = () => <svg width="1em" height="1em" viewBox="0 0 512 512" fill="currentColor"><path d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"></path></svg>
  const SortIcon = (props: any) => <svg width="1em" height="1em" viewBox="0 0 320 512" fill="currentColor" onClick={props.onClick}><path d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41zm255-105L177 64c-9.4-9.4-24.6-9.4-33.9 0L24 183c-15.1 15.1-4.4 41 17 41h238c21.4 0 32.1-25.9 17-41z"></path></svg>
  const SortUpIcon = (props: any) => <svg width="1em" height="1em" viewBox="0 0 320 512" fill="currentColor" onClick={props.onClick}><path d="M279 224H41c-21.4 0-32.1-25.9-17-41L143 64c9.4-9.4 24.6-9.4 33.9 0l119 119c15.2 15.1 4.5 41-16.9 41z"></path></svg>
  const SortDownIcon = (props: any) => <svg width="1em" height="1em" viewBox="0 0 320 512" fill="currentColor" onClick={props.onClick}><path d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"></path></svg>
  const AngleDoubleLeftIcon = (props: any) => <svg width="1em" height="1em" viewBox="0 0 448 512" fill="currentColor" onClick={props.onClick}><path d="M223.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L319.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L393.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34zm-192 34l136 136c9.4 9.4 24.6 9.4 33.9 0l22.6-22.6c9.4-9.4 9.4-24.6 0-33.9L127.9 256l96.4-96.4c9.4-9.4 9.4-24.6 0-33.9L201.7 103c-9.4-9.4-24.6-9.4-33.9 0l-136 136c-9.5 9.4-9.5 24.6-.1 34z"></path></svg>
  const AngleLeftIcon = (props: any) => <svg width="1em" height="1em" viewBox="0 0 256 512" fill="currentColor" onClick={props.onClick}><path d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"></path></svg>
  const AngleDoubleRightIcon = (props: any) => <svg width="1em" height="1em" viewBox="0 0 448 512" fill="currentColor" onClick={props.onClick}><path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34zm192-34l-136-136c-9.4-9.4-24.6-9.4-33.9 0l-22.6 22.6c-9.4 9.4-9.4 24.6 0 33.9l96.4 96.4-96.4 96.4c-9.4 9.4-9.4 24.6 0 33.9l22.6 22.6c9.4 9.4 24.6 9.4 33.9 0l136-136c9.4-9.2 9.4-24.4 0-33.8z"></path></svg>
  const AngleRightIcon = (props: any) => <svg width="1em" height="1em" viewBox="0 0 256 512" fill="currentColor" onClick={props.onClick}><path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"></path></svg>

  return (
    <>{!props.loading ?
      <div>
        <div className={windowWidth > mobileViewWidth ? 'table-bar' : 'mobile-table-bar'}>
          {props.searchable && (
            <input style={windowWidth > mobileViewWidth ? {width: 300, marginRight: 4} : {width: "inherit", marginBottom: 4}}
            className={'h-input h-input-'+theme} placeholder={languages[language as keyof langType].search} value={searchText}
            onChange={e => handleChangeSearchText(e)}>
            </input>
          )}
          <div style={{display: "flex"}}>
            {props.removeAll && (
              <button title={languages[language as keyof langType].removeAll} className={"h-button h-"+ theme +"-primary"} onClick={handleRemoveAll} style={windowWidth > mobileViewWidth ? {marginRight: 4} : {width: "100%", marginRight: 4}}>
                {windowWidth > mobileViewWidth ? <TrashIcon/> : <>{languages[language as keyof langType].removeAll}</>}
              </button>
            )}
            {props.addable && (
              <button title={languages[language as keyof langType].addRow} className={"h-button h-"+ theme +"-primary"} onClick={handleAddNew} style={windowWidth > mobileViewWidth ? {} : {width: "100%"}}>
                {windowWidth > mobileViewWidth ? <PlusIcon/> : <>{languages[language as keyof langType].addRow}</>}
              </button>
            )}
          </div>
        </div>
        <div className='table-main'>
          {windowWidth > mobileViewWidth ?
          <div className={'table-container table-container-'+theme}>
            <table className='table-responsive'>
              <thead className='thead'>
                <tr>
                  {props.columns.map((head: any, key: any) => {
                    if(head.visibility !== false || props.columns.length === key+1)
                    return(
                    <th className={'table-header table-header-'+ theme}
                      style={{minWidth: head?.width ? head.width : 150}}
                      key={key}>
                      {head.title? head.title : head.field}
                      {head.sortable && (
                        <button className='table-sorter' onClick={() => {
                          if(sorting?.key === key) {
                            sorting?.orderBy === "" && setSorting({key, orderBy: 'asc'})
                            sorting?.orderBy === "asc" && setSorting({key, orderBy: 'desc'})
                            sorting?.orderBy === "desc" && setSorting({key, orderBy: ''})
                          }else{
                            setSorting({key, orderBy: 'asc'})
                          }
                        }}>
                          {sorting?.key === key ? (
                            sorting.orderBy === "asc" ? <SortDownIcon/> : sorting.orderBy === "desc" ? <SortUpIcon/> : <SortIcon/>
                          ):<SortIcon/>}
                        </button>
                      )}
                    </th>)
                  })}
                </tr>
              </thead>
              <tbody className='table-body'>
                {filteredData.slice(...dataRange).map((items: any, key: any ) => {
                  return(
                  <tr key={key} className={"row row-"+theme}>
                    {items.map((item: any, key: any) =>{
                      if(key <= 0 && items[0] || key > 0 && props.columns[key-1]["visibility"] === false) return
                      else if(key > 0 && props.editSelectedId === items[0] || items[0] == undefined && key > 0) {
                        var fieldName = props.columns[key-1]["field"]
                        return(
                          <td className={'cell cell-'+theme} key={key} style={{textAlign: props.columns[key-1]["type"] === "checkbox" && props.columns[key-1]["align"]}}>
                            {props.columns[key-1]["type"] === "select" ?
                              <Dropdown name={fieldName}
                                data={["",...props.columns[key-1]["data"]]}
                                value={props?.editRowData[fieldName]}
                                className={props.columns[key-1]["nullable"] ? "nullable" : ""}
                                id="validate-input"
                                onChange={(e: any) => handleChangeTableDropdown(e)}
                                onBlur={(e: any) => blurEdit && onBlurInput(e)}>
                              </Dropdown>
                              :
                              <input name={fieldName}
                                ref={key === 1 ? firstInputRef : null}
                                value={props?.editRowData[fieldName]}
                                type={props.columns[key-1]["type"]}
                                className={props.columns[key-1]["nullable"] ? "nullable h-input" : props.columns[key-1]["type"] === "checkbox" ? "h-checkbox h-checkbox-"+theme : "h-input"}
                                id="validate-input"
                                checked={props?.editRowData[fieldName]}
                                onChange={e => handleEditRowChange(e, props.columns[key-1]["type"])}
                                onKeyUp={(e) => handleKeyUpInput(e)}
                                onBlur={(e) => blurEdit && onBlurInput(e)}>
                              </input>
                            }
                            {props.editRowData[fieldName] === "" && !props.columns[key-1]["nullable"] &&
                              <span id={"warning"+key} className="cell-warning" style={{display: "none"}}>
                                <span title={languages[language as keyof langType].warning}><ExclamationCircleIcon/></span>
                              </span>
                            }
                          </td>
                        )
                      }
                      else{
                      if(key === 0) return
                      let width = props.columns[key-1]["width"] ? props.columns[key-1]["width"] : 150;
                      let align = props.columns[key-1]["align"];
                      return <td className={'cell cell-'+theme} key={key}
                      title={props.columns[key-1]["type"] !== "checkbox" || props.columns[key-1]["type"] !== "boolean" ? formatValue(item, props.columns[key-1]["type"]) : ""}
                      style={align === "center" ? {textAlign: "center", maxWidth: width} : align === "right" ? {textAlign: "right", maxWidth: width} : {textAlign: "left", maxWidth: width}}
                      >{formatValue(item, props.columns[key-1]["type"])}</td>}
                    })}
                    <td>
                      <CommandCell items={items} index={key}/>
                    </td>
                  </tr>
                )})}
              </tbody>
            </table>
          </div>
          : //Mobile View
          <ul className='table-mobile'>
            {filteredData.slice(...dataRange).map((items: any, index: any ) => {
              return(
              <li key={index} className={"mobile-row mobile-row-"+theme}>
                <div style={{display: "flex"}}>
                  {<div className={'mobile-header mobile-header-'+theme}>
                    {props.columns.map((head: any, key: any) => (
                      head.visibility !== false && props.columns.length-1 !== key || props.columns[props.columns.length-1]["title"] !== "" ?
                      <b className='mobile-title' key={key}>{head.title}</b> : <span key={key}></span>
                    ))}
                  </div>}
                  {<div className='mobile-cell-container'>
                    {items.map((item: any, key: any) =>{
                      if(key <= 0 && items[0] || key > 0 && props.columns[key-1]["visibility"] === false) return
                      else if(key > 0 && props.editSelectedId === items[0] || items[0] == undefined && key > 0) {
                        var fieldName = props.columns[key-1]["field"]
                        return(
                          <div className='mobile-cell' key={key}>
                            {props.columns[key-1]["type"] === "select" ?
                            <Dropdown name={fieldName}
                              data={["",...props.columns[key-1]["data"]]}
                              value={props.editRowData[fieldName]}
                              className={props.columns[key-1]["nullable"] ? "nullable" : ""}
                              id="validate-input"
                              checked={props?.editRowData[fieldName]}
                              onChange={(e: any) => handleChangeTableDropdown(e)}>
                            </Dropdown>
                            :
                            <input name={fieldName}
                              ref={key === 1 ? firstInputRef : null}
                              value={props.editRowData[fieldName]}
                              type={props.columns[key-1]["type"]}
                              className={props.columns[key-1]["nullable"] ? "nullable h-input" : props.columns[key-1]["type"] === "checkbox" ? "h-checkbox h-checkbox-"+theme : "h-input"}
                              id="validate-input"
                              checked={props?.editRowData[fieldName]}
                              onChange={e => handleEditRowChange(e, props.columns[key-1]["type"])}
                              onKeyUp={(e) => handleKeyUpInput(e)}>
                            </input>
                            }
                            {props.editRowData[fieldName] === "" && !props.columns[key-1]["nullable"] &&
                              <span id={"warning"+key} className="cell-warning" style={{display: "none"}}>
                                <span title={languages[language as keyof langType].warning}><ExclamationCircleIcon/></span>
                              </span>
                            }
                          </div>
                        )
                      }
                      else
                      if(key === 0) return
                      return <div className={'mobile-cell mobile-cell-'+theme} key={key} title={formatValue(item, props.columns[key-1]["type"])}>&nbsp;{formatValue(item, props.columns[key-1]["type"])}</div>
                    })}
                  </div>}
                </div>
                <CommandCell items={items} index={index}/>
              </li>
            )})}
          </ul>}
          <Paging/>
        </div>
      </div> : <div className='h-loader-container'><div className={'h-loader h-loader-'+theme}></div></div>}
    </>
  )
}
