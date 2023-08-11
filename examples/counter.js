import { addStyle, createState, html, render } from 'help-es';
import styles from './counter.css' assert { type: 'css' };

addStyle(styles);

const store = createState({
  counter: 0,
  increment() { this.counter++ },
  decrement() { this.counter-- },
});

function App() {
  return html`
    <div class="counter">
      <button @click=${store.decrement}>–</button>
      <span>${store.counter}</span>
      <button @click=${store.increment}>+</button>
    </div>
  `;
}

const update = () => render(document.body, App());
store.observe(update);
update();
