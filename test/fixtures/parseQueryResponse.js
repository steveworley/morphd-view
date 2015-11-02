/**
 * A sample of the data expected to be returned.
 */
 module.exports = [{
  name: 'parse',
  matcher: 'http://testquery.com/query?where={"nid":"4"}',
  response: {
    body: {
      "4": {
        "nid": [
        {
          "value": "4"
        }
        ],
        "uuid": [
        {
          "value": "4f2fb0d8-0bc3-48da-b900-b021dcf0cf65"
        }
        ],
        "vid": [
        {
          "value": "4"
        }
        ],
        "type": [
        {
          "target_id": "incident"
        }
        ],
        "langcode": [
        {
          "value": "en"
        }
        ],
        "title": [
        {
          "value": "Dennis the Peasant"
        }
        ],
        "uid": [
        {
          "target_id": "1"
        }
        ],
        "status": [
        {
          "value": "1"
        }
        ],
        "created": [
        {
          "value": "1440565434"
        }
        ],
        "changed": [
        {
          "value": "1440565434"
        }
        ],
        "promote": [
        {
          "value": "1"
        }
        ],
        "sticky": [
        {
          "value": "0"
        }
        ],
        "revision_timestamp": [
        {
          "value": "1440565593"
        }
        ],
        "revision_uid": [
        {
          "target_id": "1"
        }
        ],
        "revision_log": [
        {
          "value": ""
        }
        ],
        "revision_translation_affected": [
        {
          "value": "1"
        }
        ],
        "default_langcode": [
        {
          "value": "1"
        }
        ],
        "path": [],
        "body": [
        {
          "value": "<p>Did you dress her up like this? Burn her! I don't want to talk to you no more, you empty-headed animal food trough water! I fart in your general direction! Your mother was a hamster and your father smelt of elderberries! Now leave before I am forced to taunt you a second time!</p>\r\n",
          "format": "basic_html",
          "summary": ""
        }
        ],
        "field_status": [
        {
          "target_id": "2"
        }
        ]
      }
    }
  }
},
{
  name: 'parse_error',
  matcher: 'http://testquery.com/query?where={":fail":"true"}',
  response: {
    body: {
      "error": -1003,
      "error_description": "No results match"
    },
    opts: {
      status: 404,
      header: {
        "Content-Type": "application/json"
      }
    }
  }
}];
