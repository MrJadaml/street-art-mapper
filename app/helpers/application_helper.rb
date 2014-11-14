module ApplicationHelper

  def link_unless_on_own_page(path, link_name)
      content_tag(:li, (link_to link_name, path)) unless current_page?(path)
  end
end
