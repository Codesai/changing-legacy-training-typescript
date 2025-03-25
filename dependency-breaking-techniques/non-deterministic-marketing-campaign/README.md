Goal
----

We have some legacy code. We need to make changes.
To make changes we need to introduce tests first.
We might have to change some code to enable testing.
We need to introduce so-called Seams (see Michael
Feathers' Working Effectively with Legacy Code).


Changing code without test is risky, so we want to

* Only change as little code as possible.
* Rely on automated Refactoring tools as much as possible.
* You must not change the public API of the class.

Task
----

The given `MarketingCampaign.ts` controls the marketing actions which
run on our online shop. During campaigns, we offer discounts.

* Break the dependencies you need to bring `MarketingCampaign.ts` under test, so that you can fix the existing tests.
* There is an existing `MarketingCampaign.test.ts` with a first test case which might or might not work.
