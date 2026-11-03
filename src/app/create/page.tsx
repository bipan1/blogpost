import { redirect } from 'next/navigation';

// Old URL for the editor; kept so existing bookmarks still work.
export default function CreatePage() {
  redirect('/admin/new');
}
