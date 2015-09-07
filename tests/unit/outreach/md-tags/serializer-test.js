import { moduleForModel, test } from 'ember-qunit';

moduleForModel('outreach/md-tags', 'Unit | Serializer | outreach/md tags', {
  // Specify the other units that are required for this test.
  needs: ['serializer:outreach/md-tags']
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  var record = this.subject();

  var serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
