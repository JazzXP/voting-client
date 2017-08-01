import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
    renderIntoDocument,
    scryRenderedDOMComponentsWithClass,
    Simulate
} from 'react-dom/test-utils';
import {List, Map} from 'immutable';
import {Results, ResultsProps} from '../../src/components/Results';
import {expect} from 'chai';

describe('Results', () => {
    it ('renders entries with vote counts or zero', () => {
        const pair = List.of('Trainspotting', '28 Days Later');
        const tally = Map({'Trainspotting':5});
        let cmp = renderIntoDocument(
            <Results pair={pair} tally={tally} />
        ) as React.Component;
        expect(cmp).to.not.equal(null);
        const component: React.Component = cmp!;
        
        const entries = scryRenderedDOMComponentsWithClass(component!, 'entry');
        const [train, days] = entries.map(e => e.textContent);

        expect(entries.length).to.equal(2);
        expect(train).to.contain('Trainspotting');
        expect(train).to.contain('5');
        expect(days).to.contain('28 Days Later');
        expect(days).to.contain('0');
    });

    it ('invokes the nextAction callback when next button is clicked', () => {
        let nextInvoked = false;
        const nextAction = () => nextInvoked = true;

        const pair = List.of('Trainspotting', '28 Days Later');
        const component = renderIntoDocument(
            <Results pair={pair}
                tally={Map()}
                nextAction={nextAction} />
        ) as React.Component;
        Simulate.click(ReactDOM.findDOMNode(component.refs.next));

        expect(nextInvoked).to.equal(true);
    });

    it ('renders the winner when there is one', () => {
        const component = renderIntoDocument(
            <Results winner="Trainspotting"
                pair={List.of("Trainspotting", "28 Days Later")}
                tally={Map()} />
        ) as React.Component;
        const winner = ReactDOM.findDOMNode(component.refs.winner);
        expect(winner).to.be.ok;
        expect(winner.textContent).to.contain("Trainspotting");
    });
});