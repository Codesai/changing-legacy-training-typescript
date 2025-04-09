import {GildedRose} from '../src/GildedRose';
import {Item} from "../src/Item";

describe('Gilded Rose', () => {
  it('Regular item decrease quality by one', () => {
    const gildedRose = new GildedRose([new Item('Regular', 10, 20)]);

    gildedRose.update();

    expect(gildedRose).toEqual(new GildedRose([new Item('Regular', 9, 19)]));
  });
});