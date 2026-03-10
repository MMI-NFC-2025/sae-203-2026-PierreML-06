/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3183463462")

  // add field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text1819170229",
    "max": 0,
    "min": 0,
    "name": "nom",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "select2638798251",
    "maxSelect": 1,
    "name": "genre_musical",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "classique"
    ]
  }))

  // add field
  collection.fields.addAt(3, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text1843675174",
    "max": 0,
    "min": 0,
    "name": "description",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "file1596439714",
    "maxSelect": 1,
    "maxSize": 0,
    "mimeTypes": [],
    "name": "photo_principale",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": [],
    "type": "file"
  }))

  // add field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "file2658997648",
    "maxSelect": 99,
    "maxSize": 0,
    "mimeTypes": [],
    "name": "galerie",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": [],
    "type": "file"
  }))

  // add field
  collection.fields.addAt(6, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_1254289504",
    "hidden": false,
    "id": "relation3648647130",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "scene",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(7, new Field({
    "hidden": false,
    "id": "date3335750638",
    "max": "",
    "min": "",
    "name": "dates_de_representation",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3183463462")

  // remove field
  collection.fields.removeById("text1819170229")

  // remove field
  collection.fields.removeById("select2638798251")

  // remove field
  collection.fields.removeById("text1843675174")

  // remove field
  collection.fields.removeById("file1596439714")

  // remove field
  collection.fields.removeById("file2658997648")

  // remove field
  collection.fields.removeById("relation3648647130")

  // remove field
  collection.fields.removeById("date3335750638")

  return app.save(collection)
})
