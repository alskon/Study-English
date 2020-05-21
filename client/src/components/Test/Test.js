import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import Loading from '../layout/Loading'
import { loadTest } from '../../actions/test'
import Question from './Question/Question'
import Alert from '../layout/Alert'

const Test = ({ match, 
    test:
        { loading, 
            allUnitTests,
            errMessage,
            test: 
                { 
                    chapter,
                    header,
                    variation,
                    questions,
                } 
            }, 
    loadTest, auth: { admin } }) => {
    
        useEffect(()=> {
        loadTest(match.params.chapter)
    }, [loadTest, match.params.chapter])

    const nextTest = () => {
        const testChapter = match.params.chapter
        const index = allUnitTests.indexOf(testChapter)
        return allUnitTests[index+1] ? allUnitTests[index+1] : allUnitTests[0]
    }

    const disabledNextTestBtn = () => {    
        const testChapter = (+match.params.chapter)
        const index = allUnitTests.indexOf(Number(testChapter))
        return allUnitTests[index+1] ? true : false
    }

    const variationField = variation && variation.length > 0 ? 
        <div className='variation'>{ variation.map((variant, index) => <span key={ index }>{ variant }</span>) }</div> : ''
        
    const questionField = questions && questions.length > 0 ? <Fragment>                                      
            { questions.map(question => <Question key={ question._id } question={ question } testChapter={ chapter }/>) } </Fragment> : 
                admin ? <Link className='link-add-test small question-link' to={`/test/${match.params.chapter}/add-question`}>Please add questions</Link> :
                <h3 className='small'>No question found</h3>
    
    const testField = loading ? <Loading /> : 
        errMessage ? <h1 className='x-large'>Test not found</h1> :    
            <Fragment>
                { admin ? <Link className='add-unit' to={`/test/${match.params.chapter}/add-question`}>Add question</Link>: '' }
                <Alert addClass='alert-test normal' />
                    <h1 className='large'>Test { chapter }</h1>                                 
                    <div className='test'>                    
                        <h2 className='normal'>{ header }</h2>
                        { variationField }
                        <ul className='form form-test normal'>  
                            { questionField }                           
                        </ul>
                        <div className='test-navigate'>
                            <Link className='btn btn-light btn-test' to='/units'>Back to units</Link>
                            { disabledNextTestBtn() ? 
                                <Link className='btn btn-light btn-test' to={`/test/${nextTest()}`}>Next test</Link> : '' }
                        </div>                         
                    </div>
                    </Fragment>
    return (
        <section className='work-section bg-dark'>     
            <div className='work-section-register'>
                { testField }
            </div>
        </section> 
    )
}

const mapStateToProps = state => ({
    test: state.test,
    auth: state.auth, 
})

Test.propTypes = {
    match: PropTypes.object.isRequired,
    test: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    loadTest: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, { loadTest })(Test);