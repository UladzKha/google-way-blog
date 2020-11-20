import * as React from 'react'
import { shallow, mount, render } from 'enzyme'
import IndexPage from '../pages/index'

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });


describe('Pages', () => {
    describe('Index', () => {
        it('should render without throwing an error', function () {
            const wrap = mount(<IndexPage posts={samplePosts} projects={sampleProjects} />)
            expect(wrap.find('[data-testid="hello-test"]').text()).toBe(`Hello! I'm Uladz.`)

        })
    })
})


const samplePosts = `[{"_id":"1", "title":"Title", "description":"desc","date":"2020-11-18T20:00:00.000Z"}]`
const sampleProjects = `[{"_id":"1", "name":"My Project", "url":"https:github.com"}]`