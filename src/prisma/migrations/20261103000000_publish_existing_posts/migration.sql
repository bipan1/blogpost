-- Posts created before drafts existed were saved with published = false even
-- though they were live. Mark them all published so they stay visible now that
-- the public pages only show published posts.
UPDATE "Post" SET "published" = true WHERE "published" = false;
