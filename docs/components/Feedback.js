import React, { useCallback, useState } from 'react'
import styles from '../../src/css/feedback.module.css'

const submitFeedback = async ({ feedback, path, text }) => {
  const props = {
    value: feedback,
    path,
    text
  }
  plausible('docs-feedback', {
    props
  })
}

const DetailedFeedback = ({ feedback, reset, path }) => {
  const [otherClicked, setOtherClicked] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [text, setText] = useState(undefined)

  const handleSubmit = data => {
    const description = text?.trim() || data
    submitFeedback({ feedback, path, text: description })
    setSubmitted(true)
    reset()
  }
  return (
    <div className={styles.feedback__detailed}>
      {feedback === 1 || submitted ? (
        <>
          <p
            className={`${styles.feedback__detailed__text} ${styles['feedback__detailed__text--positive']}`}
          >
            Thanks for the feedback!
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
          </p>
        </>
      ) : (
        <>
          <p className={styles.feedback__detailed__text}>What went wrong?</p>
          {otherClicked ? (
            <div className={styles.feedback__detailed__other}>
              <textarea
                placeholder="Describe the issue you encountered"
                value={text}
                onChange={e => setText(e.target.value)}
              />
              <button disabled={!text?.trim()} onClick={handleSubmit}>
                Submit
              </button>
            </div>
          ) : (
            <>
              <div className={styles.feedback__detailed__options}>
                <button
                  className={styles.feedback__detailed__option}
                  onClick={() => handleSubmit('incorrect')}
                >
                  Information was incorrect{' '}
                </button>
                <button
                  className={styles.feedback__detailed__option}
                  onClick={() => handleSubmit('outdated')}
                >
                  Information was outdated
                </button>
                <button
                  className={styles.feedback__detailed__option}
                  onClick={() => handleSubmit('unclear')}
                >
                  Information was unclear
                </button>
                <button
                  onClick={() => setOtherClicked(true)}
                  className={`${styles.feedback__detailed__option} ${styles['feedback__detailed__option--other']}`}
                >
                  Something Else
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  )
}

const Feedback = ({ path }) => {
  const [feedback, setFeedback] = useState()

  const reset = useCallback(
    () =>
      setTimeout(() => {
        setFeedback(null)
      }, 3000),
    []
  )

  const handleClick = value => {
    setFeedback(value)
    console.log(value)
    if (value === 1) {
      submitFeedback({ feedback: value, path, text: '' })
      reset()
    }
  }
  return (
    <div className={`feedback ${styles.feedback}`}>
      {feedback ? (
        <DetailedFeedback feedback={feedback} reset={reset} path={path} />
      ) : (
        <>
          <p className={styles.feedback__text}>Was this helpful?</p>
          <div className={styles.feedback__options}>
            <button
              onClick={() => handleClick(1)}
              className={`${styles.feedback__option} ${styles['feedback__option--yes']}`}
            >
              Yes
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                />
              </svg>
            </button>
            <button
              onClick={() => handleClick(-1)}
              className={`${styles.feedback__option} ${styles['feedback__option--no']}`}
            >
              No
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384"
                />
              </svg>
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default Feedback
