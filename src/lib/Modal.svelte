<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let open = false;
  export let ariaLabel = "Modal dialog";
  export let maxWidth = "min(95vw, 1200px)";
  export let maxHeight = "90vh";

  const dispatch = createEventDispatcher<{ close: void }>();

  const close = () => {
    dispatch("close");
  };

  function showDialog(dialog: HTMLDialogElement) {
    const opener = document.activeElement;
    dialog.showModal();
    return {
      destroy() {
        dialog.close();
        if (opener instanceof HTMLElement && opener.isConnected) opener.focus();
      }
    };
  }

  function keepFocus(event: KeyboardEvent) {
    if (event.key !== "Tab") return;
    const dialog = event.currentTarget as HTMLDialogElement;
    const controls = Array.from(dialog.querySelectorAll<HTMLElement>(
      'button:enabled, a[href], input:enabled, select:enabled, textarea:enabled, [tabindex="0"]'
    )).filter(element => element.getClientRects().length);
    const first = controls[0];
    const last = controls[controls.length - 1];
    const boundary = event.shiftKey ? first : last;
    if (boundary && document.activeElement === boundary) {
      event.preventDefault();
      (event.shiftKey ? last : first).focus();
    }
  }

  const handleOverlayClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) close();
  };
</script>

{#if open}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <dialog
    use:showDialog
    class="modal-overlay"
    on:keydown={keepFocus}
    on:cancel|preventDefault={close}
    aria-label={ariaLabel}
    on:click={handleOverlayClick}
  >
    <div class="modal-content" style="width: {maxWidth}; max-height: {maxHeight};">
      <div class="modal-header">
        <slot name="header" />
        <button
          class="modal-close-button"
          type="button"
          on:click={close}
          aria-label="Close dialog"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-5"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <!-- The diagram viewport accepts focus so arrow keys can scroll oversized diagrams. -->
      <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
      <div class="modal-body" role="region" aria-label={ariaLabel} tabindex="0">
        <slot />
      </div>
    </div>
  </dialog>
{/if}

<style>
  .modal-overlay {
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    max-width: none;
    max-height: none;
    color: inherit;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    padding: 1rem;
  }

  .modal-content {
    background: #ffffff;
    border-radius: 0.5rem;
    border: 2px solid #171717;
    overflow: auto;
    display: flex;
    flex-direction: column;
  }

  :global(.dark) .modal-content {
    background: #121515;
    border-color: #00b56a;
  }

  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 1rem;
    border-bottom: 2px solid #171717;
    flex-shrink: 0;
  }

  :global(.dark) .modal-header {
    border-bottom-color: #00b56a;
  }

  .modal-close-button {
    background-color: #f7f3e8;
    border: 2px solid #171717;
    border-radius: 0.25rem;
    padding: 0.375rem;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;
  }

  :global(.dark) .modal-close-button {
    background-color: #121515;
    border-color: #00b56a;
    color: #f7f3e8;
  }

  .modal-close-button:hover {
    background-color: #171717;
    color: #f7f3e8;
  }

  :global(.dark) .modal-close-button:hover {
    background-color: #00b56a;
    color: #171717;
  }

  .modal-body {
    padding: 1rem;
    overflow: auto;
    flex: 1;
  }
</style>
