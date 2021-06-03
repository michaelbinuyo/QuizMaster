import styled from "styled-components";

export const Form = styled.form`
  .qu {
    display: flex;
    flex-direction: column;
    textarea {
      min-height: 112px;
    }
  }
  label {
    margin-top: 0;
    margin-bottom: 0;
  }
  input,
  textarea,
  select,
  option {
    outline: none;
    color: gray;
    border-radius: 10px;
    padding: 0.5rem;
    border: none;
  }
  .ans {
    flex-direction: column;
    display: grid;
    column-gap: 1rem;
    grid-template-columns: 1fr 1fr;
    .option {
      display: flex;
      flex-direction: column;

      /* gap: 1rem; */
      margin: 0.5rem 0;
      textarea {
        height: 41px;
      }
    }
  }
  ::-webkit-scrollbar {
    display: none;
  }
  .correct-ans {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  button {
    width: fit-content;
    margin: auto;
  }
`;
