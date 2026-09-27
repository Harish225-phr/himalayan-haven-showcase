<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the public site as separate TanStack file routes with shared presentation in `src/components/site.tsx`; this preserves direct links and per-page metadata.
- Keep uploaded property photographs in Lovable Assets pointers imported directly in JSX; this preserves actual imagery while keeping the repository lightweight.
- Booking forms open a pre-filled WhatsApp enquiry rather than persisting submissions; this avoids implying instant confirmation without a booking backend.

- Keep the public site as separate TanStack file routes with shared presentation in `src/components/site.tsx`; this preserves direct links and per-page metadata.
- Keep uploaded property photographs in Lovable Assets pointers imported directly in JSX; this preserves actual imagery while keeping the repository lightweight.
- Booking forms open a pre-filled WhatsApp enquiry rather than persisting submissions; this avoids implying instant confirmation without a booking backend.
