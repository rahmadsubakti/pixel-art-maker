function Action(stackSender, stackReceiver) {
	const last_el = stackSender.pop()
	stackReceiver.push(last_el)
}

export function addToUndoStack(result, undoStack, redoStack) {
	/**
	*When user trigger a certain action
	*add the result of that action
	*into undoStack
	*/
	if (redoStack.length !== 0) {
		redoStack.length = 0;
	}
	if (undoStack.length === 20) {
		undoStack.shift()
	}

	undoStack.push(result);
}

export function undo(undoStack, redoStack) {
	Action(undoStack, redoStack);
	return undoStack[undoStack.length-1];
}

export function redo(undoStack, redoStack) {
	Action(redoStack, undoStack);
	return undoStack[undoStack.length-1];
}