/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3183463462")

  // update field
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
      "classique",
      "jazz",
      "gospel",
      "baroque",
      "opera_baroque",
      "musique_sacree",
      "danse_baroque",
      "ensemble_vocal",
      "musique_de_chambre"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3183463462")

  // update field
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
      "classique",
      "jazz",
      "gospel"
    ]
  }))

  return app.save(collection)
})
