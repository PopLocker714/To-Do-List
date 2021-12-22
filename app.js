(function() {
  // Создаем и возврощаем заголовок приложения
  function createAppTitle(title) {
    let appTitle = document.createElement('h2')
    appTitle.innerHTML = title
    return appTitle
  }

  // Создаем и возврощаем форму для создания дела
  function createTodoItemForm() {
    let form = document.createElement('form')
    let input = document.createElement('input')
    let buttonWeapper = document.createElement('div')
    let button = document.createElement('button')

    form.classList.add('input-group', 'md-3')
    input.classList.add('form-control')
    input.placeholder = 'Введите название нового дела'
    buttonWeapper.classList.add('input-group-append')
    button.classList.add('btn', 'btn-primary')
    button.textContent = 'Добавить дело'

    buttonWeapper.append(button)
    form.append(input)
    form.append(buttonWeapper)

    return {
      form,
      input,
      button
    }
  }

  // Создаем и возврощаем список элементов
  function createTodoList() {
    let list = document.createElement('ul')
    list.classList.add('list-group')
    return list
  }

  function createTodoItem(name) {
    let item = document.createElement('li')

    // Кнопки помещаем в элемент, который красиво покажет их в одной групее
    let buttonGroup = document.createElement('div')
    let doneButton = document.createElement('button')
    let deleteButton = document.createElement('button')

    // Устонавливаем стили для элементов списка, а так-же для размещения кнопок
    // в его правой части с помощью flex
    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center')
    item.textContent = name

    buttonGroup.classList.add('btn-group', 'btn-group-sm')
    doneButton.classList.add('btn', 'btn-success')
    doneButton.textContent = 'Готово'
    deleteButton.classList.add('btn', 'btn-danger')
    deleteButton.textContent = 'Удалить'

    // Вкладываем кнопки в отдельный элемент, чтобы они не объеденились в один блок
    buttonGroup.append(doneButton)
    buttonGroup.append(deleteButton)
    item.append(buttonGroup)

    // Приложению нужен доступ к самому элементу и кнопкам, чтобы обработать события нажатия
    return {
      item,
      doneButton,
      deleteButton
    }
  }

  function createTodoApp(container, title = 'Список дел', defList = [{name: 'Попить водички', done: true},{name: 'Покушать мокорошек с котлеткой', done: false}]) {

    let todoAppTitle = createAppTitle(title)
    let todoItemForm = createTodoItemForm()
    let todoList = createTodoList()

    container.append(todoAppTitle)
    container.append(todoItemForm.form)
    container.append(todoList)

    // saveLocalStorage(defList, 'def')
    // pushTodo(getLocalStorage('def'))
    let mainTodoList = defList

    pushTodo(getLocalStorage('saveList'))

    todoItemForm.form.addEventListener('submit', function(event) {
      event.preventDefault()

      if (!todoItemForm.input.value) {
        return
      }

      let todoItem = createTodoItem(todoItemForm.input.value)

      todoItem.doneButton.addEventListener('click', function() {
        todoItem.item.classList.toggle('list-group-item-success')
        updateList(mainTodoList)
      })

      todoItem.deleteButton.addEventListener('click', function() {
        if (confirm('Вы уверены?')) {
          todoItem.item.remove()
          updateList(mainTodoList)
        }
      })

      todoList.append(todoItem.item)

      todoItemForm.input.value = ''

      updateList(mainTodoList)
    })

    function pushTodo(list) {
      if (list === null) {
        list = []
      }

      list.forEach(el => {
        let saveItem = createTodoItem(el.name).item

        saveItem.children[0].childNodes[0].addEventListener('click', function() {
          saveItem.classList.toggle('list-group-item-success')
          updateList(mainTodoList)
        })

        saveItem.children[0].childNodes[1].addEventListener('click', function() {
          if (confirm('Вы уверены?')) {
            saveItem.remove()
            updateList(mainTodoList)
          }
        })

        todoList.append(saveItem)

        if (el.done) {
          saveItem.classList.toggle('list-group-item-success')
        }

      })

    }

    // localStorage

    // Функция которая читает лист дел и записывает в массив
    function getListTodo(todoList) {

      let arrRetun = []

      todoList.childNodes.forEach(el => {

        let myCar = new Object()
        myCar.name = el.firstChild.textContent
        // console.log(el.firstChild.textContent)
        el.classList.forEach(el => {
          if (el === 'list-group-item-success') {
            myCar.done = true
          } else {
            myCar.done = false
          }
        })
        arrRetun.push(myCar)
      })
      localStorage.clear()
      saveLocalStorage(arrRetun, 'saveList')

      return arrRetun
      // console.log(arrRetun)
    }

    // Функция которая обновляет главный массив
    function updateList(needMainArr) {
      needMainArr = getListTodo(todoList)
      // console.log(mainTodoList)
    }

    // Функция которая сохраняет в localStorage массив
    function saveLocalStorage(arr, key) {
      localStorage.setItem(key, JSON.stringify(arr))
    }

    // Функция которая получает массив из localStorage
    function getLocalStorage(key) {
      let = arrGet = localStorage.getItem(key)
      return arrGet = JSON.parse(arrGet)
    }

    // button disebled
    todoItemForm.button.setAttribute('disabled', 'disabled')

    setInterval(function () {
      checkBtnDisabled()
    }, 500)

    function checkBtnDisabled() {
      if (todoItemForm.input.value === '') {
        todoItemForm.button.setAttribute('disabled', 'disabled')
      } else {
        todoItemForm.button.removeAttribute('disabled')
      }
    }

  }

  window.createTodoApp = createTodoApp

})()




