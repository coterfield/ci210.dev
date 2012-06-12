				<!-- BEGIN MAIN -->
				<div id="main" style="width: 940px!important; margin-right:0px!important">

					<h1>Hola</h1>

					<?php echo validation_errors(); ?>

					<form action="/formepp" method="post" accept-charset="utf-8" class="validate">

						<fieldset class="set">

							<div class="field">
								<label>Text: </label>
								<div class="entry">
									<input type="text" class="required" name="text" />
								</div>
							</div>

							<div class="field">
								<label>Textarea:</label>
								<div class="entry">
									<textarea class="required" name="textarea"></textarea>
								</div>
							</div>

							<div class="field">
								<label>Dual text box: </label>
								<div class="entry">
									<div class="dual">
										<input type="text" placeholder="First name" class="required" name="dualtext1" />
										<input type="text" placeholder="Last name" class="required" name="dualtext2" />
									</div>
								</div>
							</div>

							<div class="field">
								<label>Select: <span>(chosen plugin)</span></label>
								<div class="entry">
									<select class="required chosen" name="select-chosen">
										<option value="">Select an option</option>
										<option>Option 1</option>
										<option>Option 2</option>
										<option>Option 3</option>
									</select>
								</div>
							</div>

							<div class="field">
								<label>Select multiple: <span>(chosen plugin)</span></label>
								<div class="entry">
									<select class="chosen {minlength:2}" name="select-multiple-chosen" multiple>
										<option selected>Option 1</option>
										<option>Option 2</option>
										<option>Option 3</option>
									</select>
								</div>
							</div>

							<div class="field">
								<select class="multiselect {minlength:2}" multiple>
									<option selected>Diplomado Internacional Intensivo de Orotodoncia</option>
									<option>Rehabilitación Oral del Edentulo Parcial con Prótesis Fija y Prótesis Removible</option>
									<option>Rehabilitación Oral con Prótesis Removible</option>
								</select>
							</div>

							<div class="heading">
								<h3>Heading</h3>
							</div>

							<div class="field">
								<label>Checkbox: <span>(default skin)</span></label>
								<div class="check-list">
									<label><input type="checkbox" name="group[]" class="{minlength:2,messages:{minlength:'Check at least 2'}}" /> Checkbox</label>
									<label><input type="checkbox" checked name="group[]" /> Checked</label>
									<label><input type="checkbox" checked disabled /> Disabled Checked</label>
									<label><input type="checkbox" disabled /> Disabled</label>
								</div>
							</div>

							<div class="field">
								<label>Radio: <span>(default skin)</span></label>
								<div class="check-list">
									<label><input type="radio" name="name" class="required" /> Radiobox</label>
									<label><input type="radio" name="name" /> Radiobox</label>
									<label><input type="radio" checked disabled /> Disabled Checked</label>
									<label><input type="radio" disabled  /> Disabled</label>
								</div>
							</div>

							<div class="field">
								<label>Checkbox: <span>(grey skin)</span></label>
								<div class="check-list grey-skin">
									<label><input type="checkbox" name="group2[]" class="{minlength:2,messages:{minlength:'Check at least 2'}}" /> Checkbox</label>
									<label><input type="checkbox" checked name="group2[]" /> Checked</label>
									<label><input type="checkbox" checked disabled /> Disabled Checked</label>
									<label><input type="checkbox" disabled /> Disabled</label>
								</div>
							</div>

							<div class="field">
								<label>Radio: <span>(grey skin)</span></label>
								<div class="check-list grey-skin">
									<label><input type="radio" name="name2" class="required" /> Radiobox</label>
									<label><input type="radio" name="name2" /> Radiobox</label>
									<label><input type="radio" checked disabled /> Disabled Checked</label>
									<label><input type="radio" disabled /> Disabled</label>
								</div>
							</div>

							<div class="field">
								<label>Checkbox: <span>(button skin)</span></label>
								<div class="check-list button-skin">
									<label><input type="checkbox" name="group3[]" /> Checkbox</label>
									<label><input type="checkbox" checked name="group3[]" /> Checked</label>
									<label><input type="checkbox" checked disabled /> Disabled Checked</label>
									<label><input type="checkbox" disabled /> Disabled</label>
								</div>
							</div>

							<div class="field">
								<label>Radio: <span>(button skin)</span></label>
								<div class="check-list button-skin">
									<label><input type="radio" name="name3" /> Radiobox</label>
									<label><input type="radio" name="name3" checked /> Checked</label>
									<label><input type="radio" checked disabled /> Disabled Checked</label>
									<label><input type="radio" disabled /> Disabled</label>
								</div>
							</div>

							<div class="field">
								<label>Checkbox: <span>(browser skin)</span></label>
								<div class="check-list no-ui">
									<label><input type="checkbox" name="group4[]" class="{minlength:2,messages:{minlength:'Check at least 2'}}" /> Checkbox</label>
									<label><input type="checkbox" checked name="group4[]" /> Checked</label>
									<label><input type="checkbox" checked disabled /> Disabled Checked</label>
									<label><input type="checkbox" disabled /> Disabled</label>
								</div>
							</div>

							<div class="field">
								<label>Radio: <span>(browser skin)</span></label>
								<div class="check-list no-ui">
									<label><input type="radio" name="name4" class="required" /> Radiobox</label>
									<label><input type="radio" name="name4" /> Radiobox</label>
									<label><input type="radio" checked disabled /> Disabled Checked</label>
									<label><input type="radio" disabled /> Disabled</label>
								</div>
							</div>

						</fieldset>

						<footer class="pane">
							<input type="submit" value="Click to validate them all!" class="fullpane-bt" />
						</footer>

						<p>Username</p>
						<input type="text" name="username" value="<?php echo set_value('username'); ?>" size="50" />

						<p>Password</p>
						<input type="text" name="password" value="<?php echo set_value('password'); ?>" size="50" />

						<p>Password Confirm</p>
						<input type="text" name="passconf" value="<?php echo set_value('passconf'); ?>" size="50" />

						<p>Email Address</p>
						<input type="text" name="email" value="<?php echo set_value('email'); ?>" size="50" />

						<div><input type="submit" value="Submit" /></div>

					</form>

				</div>
				<!-- END MAIN -->