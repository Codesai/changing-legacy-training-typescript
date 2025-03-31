import {GildedRose} from '../src/GildedRose';
import {Item} from "../src/Item";

describe('Gilded Rose', () => {
  it('Regular item decrease quality by one', () => {
    const gildedRose = new GildedRose([new Item('Regular', 10, 20)]);

    const items = gildedRose.update();

    expect(items[0].name).toBe('Regular');
    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(19);
  });
});