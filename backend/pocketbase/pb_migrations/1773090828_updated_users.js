/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("_pb_users_auth_")

  // update field
  collection.fields.addAt(9, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_3183463462",
    "hidden": false,
    "id": "relation3839690490",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "artistes_perf",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // update field
  collection.fields.addAt(10, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_1254289504",
    "hidden": false,
    "id": "relation2338869013",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "scenes_pref",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("_pb_users_auth_")

  // update field
  collection.fields.addAt(9, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_3183463462",
    "hidden": false,
    "id": "relation3839690490",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "artistes_perf",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // update field
  collection.fields.addAt(10, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_1254289504",
    "hidden": false,
    "id": "relation2338869013",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "scenes_pref",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
})
