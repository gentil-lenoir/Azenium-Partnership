# TODO: Make Language/Theme Selectors Sticky Only in Home Section

## Plan Implementation Steps

### Step 1: [IN PROGRESS] Create TODO.md with steps ✅
- Created this file to track progress.

### Step 2: [COMPLETED ✅] Update src/Css/Home.css
- Change `.language-selector-container` from `position: fixed` to `position: sticky`
- Add `top: 90px` (below header)
- Ensure smooth transitions
- Add responsive adjustments for mobile

### Step 3: [COMPLETED ✅] Test scroll behavior
- Verify selectors stick only in `#home` section
- Confirm they disappear naturally when scrolling to `#project`
- Check z-index and overlaps

### Step 4: [COMPLETED ✅] Responsive testing
- Mobile: Adjust `top` and `right` values
- Ensure no layout breaks

### Step 5: [COMPLETED ✅] Final verification & completion

**FIXED: Moved selectors INSIDE hero-section + CSS layout fixes** 🎉

**All steps completed successfully!**


- Run dev server if needed
- Use attempt_completion

**Current Status:** Ready for CSS edit in Step 2.

